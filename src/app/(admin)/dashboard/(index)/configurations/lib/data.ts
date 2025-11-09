import { prisma } from "lib/prisma";


export async function getConfigurations() {
    return prisma.configuration.findMany({
        orderBy: { id: "asc" },
    });
}

export async function getConfigurationById(id: number) {
    return prisma.configuration.findUnique({
        where: { id },
    });
}
