'use server';
import { schemaProduct, schemaProductEdit } from "@/lib/schema";
import { checkFileExists, deleteFile, uploadFile } from "@/lib/supabase";
import { ActionResult } from "@/types";
import { ProductStock } from "@prisma/client";
import { prisma } from "lib/prisma";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function storeProduct(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {

  const parse = schemaProduct.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
    brand_id: formData.get("brand_id"),
    category_id: formData.get("category_id"),
    location_id: formData.get("location_id"),
    stock: formData.get("stock"),
    images: formData.getAll("images"),
  })

  if (!parse.success) {
    return {
      error: parse.error.issues[0].message ?? "Invalid parse from data!"
    }
  }

  const uploaded_images = parse.data.images as File[];
  const filenames = [];

  for (const image of uploaded_images) {
    const filename = await uploadFile(image, 'products');
    filenames.push(filename);
  }

  try {
    await prisma.product.create({
      data: {
        name: parse.data.name,
        description: parse.data.description,
        category_id: Number.parseInt(parse.data.category_id),
        location_id: Number.parseInt(parse.data.location_id),
        brand_id: Number.parseInt(parse.data.brand_id),
        price: Number(parse.data.price),
        stock: parse.data.stock as ProductStock,
        images: filenames,
      }
    })

  } catch (err: any) {
    console.error("Insert error:", err);
    return {
      error: err.message ?? "Failed to insert data product"
    };
  }
  // finally{}
  // ✅ Revalidate halaman list produk
  revalidatePath("/dashboard/products");

  redirect("/dashboard/products/");
}

export async function updateProduct(
  _: unknown,
  formData: FormData,
  id: number
): Promise<ActionResult> {
  // ✅ Validasi input form
  const parse = schemaProductEdit.safeParse({
    id,
    name: formData.get("name")?.toString() ?? "",
    price: formData.get("price")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
    stock: formData.get("stock")?.toString() ?? "",
    brand_id: formData.get("brand_id")?.toString() ?? "",
    category_id: formData.get("category_id")?.toString() ?? "",
    location_id: formData.get("location_id")?.toString() ?? "",
  });

  const messages = parse.error?.issues.map((issue, index) => `${index + 1}. ${issue.message}`);

  if (!parse.success) {
    return {
      error: messages?.join("\n") ?? "" // atau gunakan <br /> jika ingin HTML
    };
  }


  // 🔍 Ambil data produk lama
  const product = await prisma.product.findFirst({ where: { id } });

  if (!product) {
    return { error: "Product not found" };
  }

  const uploaded_images = formData.getAll("images") as File[];

  // 💡 Deteksi file valid (bukan File kosong)
  const valid_uploaded_images = uploaded_images.filter(
    (file) => file instanceof File && file.size > 0
  );

  let filenames = product.images;

  if (valid_uploaded_images.length > 0) {
    // ✅ Validasi gambar baru hanya jika user benar-benar upload
    const parseImage = schemaProduct.pick({ images: true }).safeParse({
      images: valid_uploaded_images,
    });

    if (!parseImage.success) {
      const messages = parseImage.error.issues.map(
        (issue, index) => `${index + 1}. ${issue.message}`
      );
      return {
        error: messages.join("\n"),
      };
    }

    // 🧹 Hapus gambar lama
    for (const filename of product.images) {
      const exists = await checkFileExists(filename, "products");
      if (exists) {
        await deleteFile(filename, "products");
      }
    }

    // 📤 Upload gambar baru
    filenames = [];
    for (const image of valid_uploaded_images) {
      const filename = await uploadFile(image, "products");
      filenames.push(filename);
    }
  }

  // 📝 Update data produk
  try {
    await prisma.product.update({
      where: { id },
      data: {
        name: parse.data.name,
        description: parse.data.description,
        category_id: Number.parseInt(parse.data.category_id),
        location_id: Number.parseInt(parse.data.location_id),
        brand_id: Number.parseInt(parse.data.brand_id),
        price: Number(parse.data.price),
        stock: parse.data.stock as ProductStock,
        images: filenames,
      },
    });
  } catch (err) {
    console.error("Update error:", err);
    return { error: "Failed to update data" };
  }

  // 🔄 Revalidate halaman list produk
  revalidatePath("/dashboard/products");

  // 🚀 Redirect ke halaman list
  return redirect("/dashboard/products");
}


export async function deleteProduct(
  formData: FormData,
  id: number
): Promise<ActionResult> {

  const product = await prisma.product.findFirst({
    where: { id: id },
    select: { id: true, images: true }
  })

  if (!product) {
    return {
      error: "Product not found"
    }
  }

  try {
    for (const image of product.images) {
      console.log(image)
      await deleteFile(image, 'products')
    }

    await prisma.product.delete({
      where: {
        id
      }
    })
  } catch (err) {
    console.log(err)
    return {
      error: "Failed to delete data"
    }
  }
  // finally {}

  return redirect("/dashboard/products/")
}