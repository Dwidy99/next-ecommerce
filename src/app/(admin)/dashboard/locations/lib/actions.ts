"use server"

import type { ActionResult } from "@/app/(admin)/types"
import { refreshAndRedirect } from "@/lib/nextjs"
import { schemaLocation as locationSchema } from "@/lib/schema"
import { Prisma } from "@prisma/client"
import { prisma } from "lib/prisma"
import { redirect } from "next/navigation"

function handleLocationError(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2003") {
      return "This location is still used by products. Move those products first."
    }
  }

  return "Failed to save location. Please try again."
}

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
    console.error("[location:create]", error)
    return {
      error: handleLocationError(error),
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
    console.error("[location:update]", error)
    return {
      error: handleLocationError(error),
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
    console.error("[location:delete]", error)
    throw new Error(handleLocationError(error))
  }

  refreshAndRedirect("/dashboard/locations")
}
