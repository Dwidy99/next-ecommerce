'use server';

import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import { schemaCategory } from "@/lib/schema";
import { prisma } from "lib/prisma";

export async function postCategory(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const name = String(formData.get("name") ?? "");

  const validate = schemaCategory.safeParse({ name });

  if (!validate.success) {
    // Zod v4: gunakan .issues untuk ambil array error
    const firstError = validate.error.issues?.[0]?.message ?? "Invalid input";

    return {
      error: firstError,
    };
  }

  try {
    await prisma.category.create({
        data: {
            name: validate.data.name
        },
    })
  } catch (err) {
    console.log(err);
    return redirect("/dashboard/categories/create")
  } 
//   finally {}

  redirect("/dashboard/categories/");
}

export async function updateCategory(
  _: unknown,
  formData: FormData,
  id: number | undefined
): Promise<ActionResult>{
  const validate = schemaCategory.safeParse({
    name: formData.get("name"),
  })

  if(!validate.success) {
    return {
      error: validate.error.issues?.[0].message ?? "Invalid Input"
    }
  }

  if(id === undefined) {
    return {
      error: "Id is not found"
    }
  }

  try {
    await prisma.category.update({
      where: {
        id: id
      },
      data: {
        name: validate.data.name
      }
    })
  } catch (err) {
    console.log(err);
    return {
      error: "Failed to update data"
    }
  }

  return redirect("/dashboard/categories");
}