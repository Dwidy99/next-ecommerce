'use server';
import { schemaProduct, schemaProductEdit } from "@/lib/schema";
import { uploadFile } from "@/lib/supabase";
import { ActionResult } from "@/types";
import { ProductStock } from "@prisma/client";
import { prisma } from "lib/prisma";
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

    if(!parse.success) {
        return {
            error: parse.error.issues[0].message ?? "Invalid parse from data!"
        }
    }

    const uploaded_images = parse.data.images as File[];
    const filenames = [];

    for(const image of uploaded_images) {
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
          price: BigInt(parse.data.price.replace(/[^\d]/g, "") || "0"),
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

  redirect("/dashboard/products/");
}

export async function updateProduct(
  _: unknown,
  formData: FormData,
  id: number,
): Promise<ActionResult> {

  const parse = schemaProductEdit.safeParse({
        name: formData.get("name"),
        price: formData.get("price"),
        description: formData.get("description"),
        brand_id: formData.get("brand_id"),
        category_id: formData.get("category_id"),
        location_id: formData.get("location_id"),
        stock: formData.get("stock"),
    });

    if(!parse.success) {
        return {
            error: parse.error.issues[0].message ?? "Invalid parse from data!"
        }
    }

    const product = await prisma.product.findFirst({
      where: {
        id:id
      }
    })

    if(!product) {
      return {
        error:'Product not found'
      }
    }

    const uploaded_images = formData.getAll("images") as File[]
    const filenames = product.images;

    if(uploaded_images.length === 3) {

      const parseImage = schemaProduct.pick({images: true}).safeParse({
        images: uploaded_images
      })

      if(!parseImage.success) {
        return {
          error: "Failed to upload image"
        }
      }

      for(const image of uploaded_images) {
        const filename = await uploadFile(image, "products")
        filenames.push(filename)
      }
    }

    try {
      await prisma.product.update({
        where: {
          id: id
        },
        data: {
          name: parse.data.name,
          description: parse.data.description,
          category_id: Number.parseInt(parse.data.category_id),
          location_id: Number.parseInt(parse.data.location_id),
          brand_id: Number.parseInt(parse.data.brand_id),
          price: BigInt(parse.data.price.replace(/[^\d]/g, "") || "0"),
          stock: parse.data.stock as ProductStock,
          images: filenames,
        }
      })
    } catch (err) {
      console.log(err)

      return {
        error: "Failed to update data"
      }
    } 
    // finally {}

    return redirect("/dashboard/products");
}