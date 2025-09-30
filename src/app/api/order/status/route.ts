import { prisma } from "lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
        return NextResponse.json({ error: "Missing code" }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
        where: { code },
        select: {
            id: true,
            code: true,
            status: true,
            created_at: true,
        },
    });

    // Simulasi: Anggap order paid setelah 9 detik
    if (order?.status === "pending") {
        const now = new Date();
        const created = new Date(order.created_at); // ✅ gunakan field dari DB
        const diff = now.getTime() - created.getTime();

        if (diff > 9000) {
            await prisma.order.update({
                where: { code },
                data: { status: "success" },
            });
            return NextResponse.json({ status: "paid" });
        }
    }



    if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ status: order.status });
}
