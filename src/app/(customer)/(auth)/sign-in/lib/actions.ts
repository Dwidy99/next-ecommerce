"use server";

import { getUser, lucia } from "@/lib/auth";
import { schemaSignIn } from "@/lib/schema";
import { ActionResult } from "@/app/(customer)/types";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "lib/prisma";

// CREATE: Sign in a customer and create a customer session.
export async function SignIn(
  _: unknown,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = schemaSignIn.safeParse({
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  });

  if (!parsed.success) {
    return { error: getFirstValidationError(parsed.error) };
  }

  const currentAuth = await getUser();

  if (currentAuth.user?.role === "customer") {
    redirect("/catalogs");
  }

  if (currentAuth.user?.role === "superadmin") {
    return {
      error:
        "You are currently signed in as an admin. Please logout from the admin dashboard before signing in as customer.",
    };
  }

  const user = await prisma.user.findFirst({
    where: {
      email: parsed.data.email,
      role: "customer",
    },
  });

  if (!user) return { error: "Email or Password is wrong" };

  const isPasswordValid = await bcrypt.compare(parsed.data.password, user.password);
  if (!isPasswordValid) return { error: "Email/password incorrect" };

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  const cookieStore = await cookies();

  cookieStore.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  redirect("/?login=success");
}

// DELETE: Sign out the current customer session.
export async function SignOut(): Promise<ActionResult> {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(lucia.sessionCookieName)?.value;

    if (!sessionId) return { error: "No active session found" };

    const { session } = await lucia.validateSession(sessionId);
    if (!session) return { error: "Invalid or expired session" };

    await lucia.invalidateUserSessions(session.userId);

    const blankSessionCookie = lucia.createBlankSessionCookie();
    cookieStore.set(
      blankSessionCookie.name,
      blankSessionCookie.value,
      blankSessionCookie.attributes,
    );
  } catch (error) {
    console.error("Failed to sign out customer:", error);
    return { error: "Failed to sign out" };
  }

  redirect("/?logout=success");
}

// VALIDATION HELPER
function getFirstValidationError(error: { issues?: Array<{ message: string }> }) {
  return error.issues?.[0]?.message ?? "Invalid input";
}
