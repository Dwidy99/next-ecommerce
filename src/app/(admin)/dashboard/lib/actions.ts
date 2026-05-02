"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { lucia } from "@/lib/auth";

// DELETE: End the current admin session.
export async function Logout() {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(lucia.sessionCookieName)?.value;

    if (sessionId) {
        try {
            await lucia.invalidateSession(sessionId);
        } catch (error) {
            console.error("[admin-logout] Failed to invalidate session:", error);
        }
    }

    const blankSessionCookie = lucia.createBlankSessionCookie();
    cookieStore.set(
        blankSessionCookie.name,
        blankSessionCookie.value,
        blankSessionCookie.attributes,
    );

    redirect("/login");
}
