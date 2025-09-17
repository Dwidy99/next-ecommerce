'use server'

import { schemaSignIn } from "@/lib/schema"
import { ActionResult } from "@/types"
import { redirect } from "next/navigation"
import bcrypt from "bcrypt"
import { lucia } from "@/lib/auth"
import { cookies } from "next/headers"
import { prisma } from "lib/prisma"

export async function SignIn(
    _: unknown,
    formData: FormData
): Promise<ActionResult> {
    const validate = schemaSignIn.safeParse({
        email: String(formData.get('email') ?? ''),
        password: String(formData.get('password') ?? '')
    })


    if (!validate.success) {
        // Zod v4: gunakan .issues untuk ambil array error
        const firstError = validate.error.issues?.[0]?.message ?? "Invalid input";

        return {
            error: firstError,
        };
    }

    const existingUser = await prisma.user.findFirst({
        where: {
            email: validate.data.email,
            role: 'customer'
        }
    })

    if (!existingUser) {
        return {
            error: 'Email or Password is wrong'
        }
    }

    const comparePassword = await bcrypt.compare(validate.data.password, existingUser.password)


    if (!comparePassword) {
        return {
            error: 'Email/password incorrect'
        }
    }

    const session = await lucia.createSession(existingUser.id, {})
    const sessionCookie = await lucia.createSessionCookie(session.id)
        ; (await cookies()).set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        )

    return redirect('/')
}