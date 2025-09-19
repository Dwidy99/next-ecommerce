'use server'

import { schemaSignIn, schemaSignUp } from "@/lib/schema"
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

export async function SignUp(
    _: unknown,
    formData: FormData
): Promise<ActionResult> {

    const parse = schemaSignUp.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    })

    if (!parse.success) {
        return {
            error: parse.error.issues[0].message ?? "Invalid validation"
        }
    }

    const hashPassword = bcrypt.hashSync(parse.data.password, 12);

    try {
        await prisma.user.create({
            data: {
                name: parse.data.name,
                email: parse.data.email,
                password: parse.data.password,
                role: 'customer',
            }
        })
    } catch (err) {
        console.log(err)
        return {
            error: 'Failed to sign in'
        }
    }
    // finally {}

    return redirect("sign-in");

}