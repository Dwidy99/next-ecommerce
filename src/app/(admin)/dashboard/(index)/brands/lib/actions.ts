"use server";

import { schemaBrand } from "@/lib/schema";
import { checkFileExists, uploadFile } from "@/lib/supabase";
import { ActionResult } from "@/types";
import { prisma } from "lib/prisma";
import { redirect } from "next/navigation";

export async function postBrand(
    _:unknown,
    formData: FormData,
): Promise<ActionResult>{
    const name = String(formData.get("name") ?? "");
    const image = formData.get("image") as File;
    
    // Validasi input menggunakan Zod
    const validate = schemaBrand.safeParse({ name, image });
    
    if (!validate.success) {
        // Zod v4: gunakan .issues untuk ambil array error
        const firstError = validate.error.issues?.[0]?.message ?? "Invalid input";

        return {
            error: firstError,
        };
    }

    try {
        const filename = await uploadFile(validate.data.image, "brands");

        await prisma.brand.create({
            data: {
                name: validate.data.name,
                logo: filename,
            },
        })
    } catch (err) {
        console.error(err);
        return {
            error: "Failed to insert data"
        }
    } 
    //   finally {}

    return redirect("/dashboard/brands/");
}

export async function updateBrand(
    _: unknown,
    formData: FormData,
    id: number
): Promise<ActionResult> {

    const name = formData.get("name");
    const logo = formData.get("image");

    const validate = schemaBrand.pick({"name": true}).safeParse({name});
    
    if (!validate.success) {;

        return {
            error: validate.error.issues[0].message ?? "Invalid input",
        };
    }

    const brand = await prisma.brand.findFirst({
        where: {id},
        select: {logo: true}
    })

    let fileName = brand?.logo;

    // ✅ Cek apakah file lama tidak ada di storage
    const fileMissing = fileName && !(await checkFileExists(fileName));

    // ✅ Upload file baru jika file lama hilang atau ada file baru di form
    if ((logo instanceof File && logo.size > 0) || fileMissing) {
        if (logo instanceof File && logo.size > 0) {
        fileName = await uploadFile(logo, "brands");
        } else {
        return { error: "Logo file missing. Please upload a new one." };
        }
    }

    try {
        await prisma.brand.update({
            where: {
                id: id
            },
            data: {
                name: validate.data.name,
                logo: fileName
            }
        })
    } catch (err) {
        console.log(err);
        return {
            error: "Failed to update data"
        }
    } 
    // finally {}

    return redirect("/dashboard/brands/"); 
}