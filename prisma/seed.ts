import { slugify } from "@/lib/utils";
import { prisma } from "lib/prisma";


async function main() {
    const categories = await prisma.category.findMany();
    for (const cat of categories) {
        if (!cat.slug) {
            await prisma.category.update({
                where: { id: cat.id },
                data: { slug: slugify(cat.name) },
            });
        }
    }

    const products = await prisma.product.findMany();
    for (const p of products) {
        if (!p.slug) {
            await prisma.product.update({
                where: { id: p.id },
                data: { slug: slugify(p.name) },
            });
        }
    }

}

main().finally(() => prisma.$disconnect());
