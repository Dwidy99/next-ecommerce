"use server";

import bcrypt from "bcrypt";
import { ActionResult } from "@/types";
import { schemaSignUp } from "@/lib/schema";
import { prisma } from "lib/prisma";
import { redirect } from "next/navigation";
import { sendEmailVerificationDirect } from "../../verify-email/lib/actions"; // ✅ gunakan direct version

export async function SignUp(
    _: unknown,
    formData: FormData
): Promise<ActionResult> {
    const parsed = schemaSignUp.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    });

    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    const { name, email, password } = parsed.data;

    // 🔹 Cek existing user
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return { error: "Email already registered." };

    // 🔹 Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 🔹 Simpan user baru
    const newUser = await prisma.user.create({
        data: { name, email, password: hashedPassword, role: "customer" },
    });

    // 🔹 Kirim email verifikasi pakai versi Direct
    await sendEmailVerificationDirect(newUser.id, newUser.email, newUser.name);

    // ✅ Redirect ke halaman konfirmasi
    redirect("/verify-email/sent");
}
