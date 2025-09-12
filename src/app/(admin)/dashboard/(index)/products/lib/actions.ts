'use server';
import { schemaProduct } from "@/lib/schema";
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