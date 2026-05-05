import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia, Session, TimeSpan } from "lucia";
import { RoleUser } from "@prisma/client";
import { cache } from "react";
import { cookies } from "next/headers";
import { User } from "lucia";
import { prisma } from "../../lib/prisma";
import { getErrorMessage, warnOnce } from "@/lib/error-message";


const adapter = new PrismaAdapter(prisma.session, prisma.user)

// Auth session lifetime.
// A user must sign in again after 24 hours.
// Keep this value small and obvious so it is easy to reuse in future projects.
const SESSION_EXPIRES_IN = new TimeSpan(24, "h")

type AuthResult = { user: User; session: Session } | { user: null; session: null };

export const lucia = new Lucia(adapter, {
    sessionExpiresIn: SESSION_EXPIRES_IN,
    sessionCookie: {
        expires: true,
        attributes: {
            secure: process.env.NODE_ENV === "production"
        }
    },
    getUserAttributes: (attributes) => {
        return {
            id: attributes.id,
            name: attributes.name,
            email: attributes.email,
            role: attributes.role,
            image: attributes.image,
        }
    }
})

export const getUser = cache(
    async (): Promise<AuthResult> => {
        const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
        if (!sessionId) {
            return {
                user: null,
                session: null
            };
        }

        try {
            const result = await lucia.validateSession(sessionId);
            // next.js throws when you attempt to set cookie when rendering page
            try {
                if (result.session && result.session.fresh) {
                    const sessionCookie = lucia.createSessionCookie(result.session.id);
                    (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
                }
                if (!result.session) {
                    const sessionCookie = lucia.createBlankSessionCookie();
                    (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
                }
            } catch { }
            return result;
        } catch (error) {
            warnOnce(`Failed to validate user session. ${getErrorMessage(error)}`);
            return {
                user: null,
                session: null
            };
        }
    }
);

// Use these helpers when a route must belong to one side of the app.
// Admin sessions should not be treated as customer sessions, and vice versa.
function getRoleUser(result: AuthResult, role: RoleUser): AuthResult {
    if (!result.user || result.user.role !== role) {
        return {
            user: null,
            session: null
        };
    }

    return result;
}

export async function getCustomerUser(): Promise<AuthResult> {
    return getRoleUser(await getUser(), "customer");
}

export async function getAdminUser(): Promise<AuthResult> {
    return getRoleUser(await getUser(), "superadmin");
}

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia
        UserId: number;
        DatabaseUserAttributes: {
            id: number
            name: string
            email: string
            role: RoleUser
            image: string | null
        }
    }
}
