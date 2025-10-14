"use server"

import { prisma } from "lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteCategory(id: number) {
    try {
        await prisma.category.delete({ where: { id } })
        revalidatePath("/categories")
        return { success: true }
    } catch (error) {
        console.error("❌ Error deleting category:", error)
        return { success: false, message: "Failed to delete category" }
    }
}
