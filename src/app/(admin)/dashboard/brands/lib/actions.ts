"use server";

import { refreshAndRedirect } from "@/lib/nextjs";
import { schemaBrand } from "@/lib/schema";
import { checkFileExists, deleteFile, uploadFile } from "@/lib/supabase";
import { ActionResult } from "@/types";
import { prisma } from "lib/prisma";
import { redirect } from "next/navigation";

export async function postBrand(
    _: unknown,
    formData: FormData
): Promise<ActionResult> {
    const name = String(formData.get("name") ?? "");
    const image = formData.get("image") as File;

    const validate = schemaBrand.safeParse({ name, image });

    if (!validate.success) {
        return {
            error: validate.error.issues?.[0]?.message ?? "Invalid input",
        };
    }

    try {
        const filename = await uploadFile(validate.data.image, "brands");

        await prisma.brand.create({
            data: {
                name: validate.data.name,
                logo: filename,
            },
        });
    } catch (err) {
        console.error(err);
        return { error: "Failed to insert data" };
    }

    redirect("/dashboard/brands");
}

export async function updateBrand(
    _: unknown,
    formData: FormData,
    id: number
): Promise<ActionResult> {
    const name = formData.get("name");
    const logo = formData.get("image");

    const validate = schemaBrand.pick({ name: true }).safeParse({ name });

    if (!validate.success) {
        return {
            error: validate.error.issues?.[0]?.message ?? "Invalid input",
        };
    }

    const brand = await prisma.brand.findUnique({
        where: { id },
        select: { logo: true },
    });

    if (!brand) {
        return { error: "Brand not found" };
    }

    let filename = brand.logo;

    const fileMissing = filename && !(await checkFileExists(filename));

    if ((logo instanceof File && logo.size > 0) || fileMissing) {
        if (logo instanceof File && logo.size > 0) {
            if (filename) await deleteFile(filename, "brands");
            filename = await uploadFile(logo, "brands");
        } else {
            return { error: "Logo file missing. Please upload a new one." };
        }
    }

    try {
        await prisma.brand.update({
            where: { id },
            data: {
                name: validate.data.name,
                logo: filename,
            },
        });
    } catch (err) {
        console.error(err);
        return { error: "Failed to update data" };
    }

    redirect("/dashboard/brands");
}

/* DELETE */

export async function deleteBrand(formData: FormData): Promise<void> {
    const id = Number(formData.get("id"));

    const brand = await prisma.brand.findUnique({
        where: { id },
        select: { logo: true },
    });

    if (!brand) {
        throw new Error("Brand not found");
    }

    try {
        await deleteFile(brand.logo, "brands");

        await prisma.brand.delete({
            where: { id },
        });
    } catch (err) {
        console.error("Delete brand error:", err);
        throw new Error("Failed to delete brand");
    }

    refreshAndRedirect("/dashboard/brands");
}