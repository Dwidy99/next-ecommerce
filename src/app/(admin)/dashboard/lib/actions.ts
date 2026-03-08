"use server"

import { prisma } from "lib/prisma";


export async function resetOrders() {
    if (process.env.NODE_ENV === "production") {
        throw new Error("Reset orders disabled in production");
    }

    await prisma.order.deleteMany();

    return { message: "All orders cleared." };
}