import { NextResponse } from "next/server";
import { getCustomerUser } from "@/lib/auth";

export async function GET() {
    const { user } = await getCustomerUser();
    return NextResponse.json({ user });
}
