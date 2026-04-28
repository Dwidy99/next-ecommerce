"use server"

import type { ActionResult } from "@/app/(admin)/types"
import { refreshAndRedirect } from "@/lib/nextjs"
import { prisma } from "lib/prisma"

function getOptionalString(data: FormData, key: string) {
  const value = data.get(key)
  if (typeof value !== "string") return null

  return value.trim() === "" ? null : value.trim()
}

export async function createConfiguration(
  _: unknown,
  data: FormData,
): Promise<ActionResult> {
  const webname = getOptionalString(data, "webname")
  const language = data.get("language") as "ID" | "EN" | null

  if (!webname) return { error: "Website name is required." }
  if (language !== "ID" && language !== "EN") {
    return { error: "Language is required." }
  }

  const exist = await prisma.configuration.findFirst({ where: { language } })
  if (exist) return { error: `Configuration for ${language} already exists.` }

  try {
    await prisma.configuration.create({
      data: {
        webname,
        language,
        tagline: getOptionalString(data, "tagline"),
        email: getOptionalString(data, "email"),
        website: getOptionalString(data, "website"),
        description: getOptionalString(data, "description"),
        address: getOptionalString(data, "address"),
        facebook: getOptionalString(data, "facebook"),
        instagram: getOptionalString(data, "instagram"),
        twitter: getOptionalString(data, "twitter"),
      },
    })
  } catch (error) {
    console.error("[configuration:create]", error)
    return { error: "Failed to create configuration." }
  }

  refreshAndRedirect("/dashboard/configurations")
  return { error: "" }
}

export async function updateConfiguration(
  _: unknown,
  data: FormData,
  id: number,
): Promise<ActionResult> {
  const webname = getOptionalString(data, "webname")
  const language = data.get("language") as "ID" | "EN" | null

  if (!webname) return { error: "Website name is required." }
  if (language !== "ID" && language !== "EN") {
    return { error: "Language is required." }
  }

  try {
    await prisma.configuration.update({
      where: { id },
      data: {
        tagline: getOptionalString(data, "tagline"),
        website: getOptionalString(data, "website"),
        email: getOptionalString(data, "email"),
        webname,
        language,
        description: getOptionalString(data, "description"),
        address: getOptionalString(data, "address"),
        facebook: getOptionalString(data, "facebook"),
        instagram: getOptionalString(data, "instagram"),
        twitter: getOptionalString(data, "twitter"),
      },
    })
  } catch (error) {
    console.error("[configuration:update]", error)
    return { error: "Failed to update configuration." }
  }

  refreshAndRedirect("/dashboard/configurations")
  return { error: "" }
}

export async function deleteConfiguration(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"))

  if (!id) {
    throw new Error("Invalid configuration ID")
  }

  const totalConfigurations = await prisma.configuration.count()
  if (totalConfigurations <= 1) {
    throw new Error("At least one configuration must remain active.")
  }

  await prisma.configuration.delete({ where: { id } })
  refreshAndRedirect("/dashboard/configurations")
}
