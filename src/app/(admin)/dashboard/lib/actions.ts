"use server";

import { prisma } from "lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function resetOrders() {
    if (process.env.NODE_ENV === "production") {
        throw new Error("Reset orders disabled in production");
    }

    await prisma.order.deleteMany();

    return { message: "All orders cleared." };
}

export async function Logout() {
    const cookieStore = await cookies();

    cookieStore.delete("session");

    redirect("/sign-in");
}