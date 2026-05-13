"use server";

import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ActionResult } from "@/app/(admin)/types";
import { getUser, lucia } from "@/lib/auth";
import { getErrorMessage } from "@/lib/error-message";
import { schemaSignIn } from "@/lib/schema";
import { prisma } from "lib/prisma";

function isDatabaseConnectionError(message: string) {
  return (
    message.includes("Can't reach database server") ||
    message.includes("Tenant or user not found") ||
    message.includes("Error querying the database") ||
    message.includes("Timed out fetching a new connection")
  );
}

// CREATE: Sign in an admin user and create an admin session.
export async function SignIn(
  _: unknown,
  formData: FormData,
): Promise<ActionResult> {
  const validate = schemaSignIn.safeParse({
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  });

  if (!validate.success) {
    const firstError = validate.error.issues?.[0]?.message ?? "Invalid input";
    return { error: firstError };
  }

  const currentAuth = await getUser();

  if (currentAuth.user?.role === "superadmin") {
    redirect("/dashboard");
  }

  if (currentAuth.user?.role === "customer") {
    return {
      error:
        "You are currently signed in as a customer. Please logout from the customer account before signing in as admin.",
    };
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: validate.data.email,
        role: "superadmin",
      },
    });

    if (!existingUser) {
      return { error: "Email not found" };
    }

    const passwordMatch = await bcrypt.compare(
      validate.data.password,
      existingUser.password,
    );

    if (!passwordMatch) {
      return { error: "Email/password incorrect" };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);

    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (error) {
    const message = getErrorMessage(error, "Failed to sign in");
    console.error("[admin-login]", message);

    if (isDatabaseConnectionError(message)) {
      return {
        error:
          "Database connection is currently unavailable. Please check your DATABASE_URL or Supabase pooler status, then try again.",
      };
    }

    return { error: "Failed to sign in. Please try again." };
  }

  redirect("/dashboard");
}
