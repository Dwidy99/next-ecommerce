import { cleanupExpiredTokens } from "@/lib/clean-token";
import { NextResponse } from "next/server";


export async function GET() {
    const result = await cleanupExpiredTokens();
    return NextResponse.json(result);
}
