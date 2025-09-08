"use server";

import { schemaBrand } from "@/lib/schema";
import { uploadFile } from "@/lib/supabase";
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
        console.log("Uploading file:", validate.data.image);
        const filename = await uploadFile(validate.data.image, "brands");
        console.log("Uploaded filename:", filename);


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