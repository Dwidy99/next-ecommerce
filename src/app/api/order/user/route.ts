// app/api/order/user/route.ts
import { getUser } from "@/lib/auth";

import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET() {
    const { user } = await getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const orders = await prisma.order.findMany({
        where: { user_id: user.id },
        orderBy: { created_at: "desc" },
        include: {
            detail: true,
            products: {
                include: { product: true }
            }
        },
    });

    return NextResponse.json(orders);
}
