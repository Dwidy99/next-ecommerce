"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// DELETE: End the current admin session.
export async function Logout() {
    const cookieStore = await cookies();
    cookieStore.delete("session");

    redirect("/login");
}
