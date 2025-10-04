// app/api/order/history/route.ts

import { getUser } from "@/lib/auth";

import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET() {
    const { user } = await getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const orders = await prisma.order.findMany({
        where: { user_id: user.id },
        orderBy: { created_at: "desc" },
    });

    // ✅ convert BigInt (total) to number
    const safeOrders = orders.map((order) => ({
        ...order,
        total: Number(order.total), // <- ubah BigInt ke number
        created_at: order.created_at.toISOString(), // optional: biar aman parsing tanggal
    }));

    return NextResponse.json({ orders: safeOrders });
}
