"use server";

import { findUserByEmail } from "./data";
import { prisma } from "lib/prisma";
import crypto from "crypto";
import { sendResetPasswordEmail } from "./email";
import { redirect } from "next/navigation";

export async function ForgotPasswordAction(_: unknown, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  if (!email) return { error: "Email is required" };

  const user = await findUserByEmail(email);
  if (!user) return { error: "No account found with this email" };

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 1000 * 60 * 60);

  await prisma.userToken.upsert({
    where: {
      userId_type: {
        userId: user.id,
        type: "PASSWORD_RESET",
      },
    },
    update: {
      token,
      expires,
    },
    create: {
      userId: user.id,
      token,
      expires,
      type: "PASSWORD_RESET",
    },
  });

  await sendResetPasswordEmail(user.email, token, user.name);
  redirect("/forgot-password/sent");
}
