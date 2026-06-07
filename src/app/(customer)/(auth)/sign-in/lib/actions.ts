"use server";

import { getUser, lucia } from "@/lib/auth";
import { schemaSignIn } from "@/lib/schema";
import { ActionResult } from "@/app/(customer)/types";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "lib/prisma";
import { getErrorMessage } from "@/lib/error-message";

function isDatabaseConnectionError(message: string) {
  return (
    message.includes("Can't reach database server") ||
    message.includes("Tenant or user not found") ||
    message.includes("Error querying the database") ||
    message.includes("Timed out fetching a new connection")
  );
}

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

  try {
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
  } catch (error) {
    const message = getErrorMessage(error, "Failed to sign in");
    console.error("[customer-login]", message);

    if (isDatabaseConnectionError(message)) {
      return {
        error:
          "Database connection is currently busy. Please wait a moment and try again.",
      };
    }

    return { error: "Failed to sign in. Please try again." };
  }

  revalidatePath("/", "layout");
  redirect("/catalogs?login=success");
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

  revalidatePath("/", "layout");

  return { error: "", redirectUrl: "/?logout=success" };
}

// VALIDATION HELPER
function getFirstValidationError(error: { issues?: Array<{ message: string }> }) {
  return error.issues?.[0]?.message ?? "Invalid input";
}
