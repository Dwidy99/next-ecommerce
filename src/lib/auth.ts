// lib/auth.ts
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";
import { RoleUser } from "@/generated/prisma";
import prisma from "../../lib/prisma";

// 1. Fixed Prisma adapter initialization
const adapter = new PrismaAdapter(prisma.session, prisma.user);

// 2. Improved Lucia configuration with proper types
export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => ({
    id: attributes.id,
    name: attributes.name,
    email: attributes.email,
    role: attributes.role,
  }),
});

// 3. Enhanced session validation with proper error handling
export const validateSession = cache(async () => {
  const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
  
  if (!sessionId) {
    return { user: null, session: null };
  }

  try {
    const { user, session } = await lucia.validateSession(sessionId);
    
    // 4. Handle session updates properly
    if (session?.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      (await cookies()).set(
        sessionCookie.name, 
        sessionCookie.value, 
        sessionCookie.attributes
      );
    }
    
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }

    return { user, session };
  } catch (e) {
    console.error("Session validation error:", e);
    return { user: null, session: null };
  }
});

// 5. Simplified user retrieval
export const getUser = cache(async () => {
  const { user } = await validateSession();
  return user;
});

// 6. Improved type declarations
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  id: number;
  name: string;
  email: string;
  role: RoleUser;
}