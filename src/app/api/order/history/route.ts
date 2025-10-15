
import { getPurchaseHistory } from "@/app/(customer)/(index)/payment/lib/data";
import { NextResponse } from "next/server";

export async function GET() {
    const { error, orders } = await getPurchaseHistory();

    if (error === "Unauthorized") {
        return NextResponse.json({ error }, { status: 401 });
    }

    if (error) {
        return NextResponse.json({ error }, { status: 500 });
    }

    // ✅ Convert BigInt (safety double-check, just in case)
    const serializedOrders = JSON.parse(
        JSON.stringify(orders, (_, value) =>
            typeof value === "bigint" ? Number(value) : value
        )
    );

    return NextResponse.json({ orders: serializedOrders });
}
