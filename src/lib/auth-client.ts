"use client";

export async function getUserClient() {
    try {
        const res = await fetch("/api/user", { cache: "no-store" });
        if (!res.ok) return null;
        const data = await res.json();
        return data.user;
    } catch (error) {
        console.error("getUserClient error:", error);
        return null;
    }
}
