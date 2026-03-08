"use server";

import { prisma } from "lib/prisma";
import { revalidatePath } from "next/cache";


export async function createConfiguration(data: FormData) {
    const webname = data.get("webname") as string;
    const language = data.get("language") as "ID" | "EN";

    // Prevent duplicate language configuration
    const exist = await prisma.configuration.findFirst({ where: { language } });
    if (exist) throw new Error(`Configuration for ${language} already exists.`);

    await prisma.configuration.create({
        data: {
            webname,
            language,
            tagline: data.get("tagline") as string,
            email: data.get("email") as string,
            website: data.get("website") as string,
        },
    });

    revalidatePath("/dashboard/configurations");
}

export async function updateConfiguration(id: number, data: FormData) {
    await prisma.configuration.update({
        where: { id },
        data: {
            tagline: data.get("tagline") as string,
            website: data.get("website") as string,
            email: data.get("email") as string,
            webname: data.get("webname") as string,
            language: data.get("language") as "ID" | "EN",
        },
    });

    revalidatePath("/dashboard/configurations");
}

export async function deleteConfiguration(id: number) {
    const config = await prisma.configuration.findUnique({ where: { id } });

    if (!config) throw new Error("Configuration not found.");
    if (config.language === "ID" || config.language === "EN") {
        throw new Error("Cannot delete default configuration.");
    }

    await prisma.configuration.delete({ where: { id } });
    revalidatePath("/dashboard/configurations");
}
