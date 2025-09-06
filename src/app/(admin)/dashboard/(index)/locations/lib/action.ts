'use server';

import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import { schemaLocation } from "@/lib/schema";
import { prisma } from "lib/prisma";

export async function postLocation(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const name = String(formData.get("name") ?? "");

  const validate = schemaLocation.safeParse({ name });

  if (!validate.success) {
    // Zod v4: gunakan .issues untuk ambil array error
    const firstError = validate.error.issues?.[0]?.message ?? "Invalid input";

    return {
      error: firstError,
    };
  }

  try {
    await prisma.location.create({
        data: {
            name: validate.data.name
        },
    })
  } catch (err) {
    console.log(err);
    return redirect("/dashboard/locations/create")
  } 
//   finally {}

  redirect("/dashboard/locations/");
}

export async function updateLocation(
  _: unknown,
  formData: FormData,
  id: number | undefined
): Promise<ActionResult>{
  const validate = schemaLocation.safeParse({
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
    await prisma.location.update({
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

  return redirect("/dashboard/locations");
}

export async function deleteLocation(
  _:unknown,
  formData: FormData,
): Promise<ActionResult>{
  const id = Number(formData.get("id"));

  if (!id) {
    return { error: "Invalid location ID" };
  }

  try {
    await prisma.location.delete({ where: { id } });
  } catch (err: any) {
    console.error("Delete error:", err);
    return { error: "Location could not be deleted. It may be linked to other data." };
  }
  
  redirect("/dashboard/locations");
}