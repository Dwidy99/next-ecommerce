// src/app/(customer)/(auth)/reset-password/[token]/lib/actions.ts
"use server";

import { prisma } from "lib/prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { ActionResult } from "@/types";

export async function ResetPasswordAction(
    token: string,
    formData: FormData
): Promise<ActionResult> {
    const password = String(formData.get("password") ?? "").trim();
    const confirm = String(formData.get("confirm") ?? "").trim();

    if (!password || !confirm) return { error: "All fields are required" };
    if (password.length < 6) return { error: "Password must be at least 6 characters" };
    if (password !== confirm) return { error: "Passwords do not match" };

    // 🔍 Cari token
    const record = await prisma.userToken.findUnique({
        where: { token },
        include: { user: true },
    });

    if (!record) return { error: "Invalid or expired reset token" };
    if (record.expires < new Date()) return { error: "Token has expired" };

    // 🔐 Hash password baru
    const hash = await bcrypt.hash(password, 12);

    // 💾 Update user password
    await prisma.user.update({
        where: { id: record.userId },
        data: { password: hash },
    });

    // 🧹 Hapus token setelah digunakan
    await prisma.userToken.delete({
        where: { id: record.id },
    });

    return redirect("/reset-password-success");
}
