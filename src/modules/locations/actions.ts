"use server"

import { prisma } from "lib/prisma"
import { ActionResult } from "@/types"
import { redirect } from "next/navigation"
import { locationSchema } from "./schema"

export async function createLocation(
  _: unknown,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = locationSchema.safeParse({
    name: formData.get("name"),
  })

  if (!parsed.success) {
    return {
      error: parsed.error.issues?.[0]?.message ?? "Invalid input",
    }
  }

  try {
    await prisma.location.create({
      data: {
        name: parsed.data.name,
      },
    })
  } catch (error) {
    console.error("Create location error:", error)
    return {
      error: "Failed to create location",
    }
  }

  redirect("/dashboard/locations")
}

export async function updateLocation(
  _: unknown,
  formData: FormData,
  id: number | undefined,
): Promise<ActionResult> {
  if (id === undefined) {
    return {
      error: "Location ID is required",
    }
  }

  const parsed = locationSchema.safeParse({
    name: formData.get("name"),
  })

  if (!parsed.success) {
    return {
      error: parsed.error.issues?.[0]?.message ?? "Invalid input",
    }
  }

  try {
    await prisma.location.update({
      where: {
        id,
      },
      data: {
        name: parsed.data.name,
      },
    })
  } catch (error) {
    console.error("Update location error:", error)
    return {
      error: "Failed to update location",
    }
  }

  redirect("/dashboard/locations")
}

export async function deleteLocation(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"))

  if (!id) {
    throw new Error("Invalid location ID")
  }

  try {
    await prisma.location.delete({
      where: {
        id,
      },
    })
  } catch (error) {
    console.error("Delete location error:", error)
    throw new Error(
      "Location could not be deleted. It may be linked to other data.",
    )
  }

  redirect("/dashboard/locations")
}
