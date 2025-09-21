import { prisma } from "lib/prisma";

export async function getCategories() {
    try {
        // Simulasi delay 2 detik
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: {
                        products: true
                    }
                }
            }
        })

        return categories
    } catch (err) {
        console.log(err)
        return []
    }
    // finally { }
}