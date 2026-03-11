"use server"

import { refreshAndRedirect } from "@/lib/nextjs"
import { prisma } from "lib/prisma"

export async function deleteCategory(id: number) {
    try {
        await prisma.category.delete({ where: { id } })
        refreshAndRedirect("/categories")
        return { success: true }
    } catch (error) {
        console.error("❌ Error deleting category:", error)
        return { success: false, message: "Failed to delete category" }
    }
}
