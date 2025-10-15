"use server"

import { prisma } from "lib/prisma"


export async function resetOrders() {
    await prisma.order.deleteMany()
    return { message: "All orders cleared." }
}
