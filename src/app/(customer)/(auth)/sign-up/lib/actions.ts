"use server";

import { schemaSignUp } from "@/lib/schema";
import { ActionResult } from "@/types";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { prisma } from "lib/prisma";
import { sendEmailVerificationDirect } from "../../verify-email/lib/actions";

export async function SignUp(
  _: unknown,
  formData: FormData,
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

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return { error: "Email already registered." };

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "customer",
    },
  });

  await sendEmailVerificationDirect(newUser.id, newUser.email, newUser.name);

  redirect("/verify-email/sent");
}
