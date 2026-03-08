import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function getCategories() {
  try {
    return await prisma.category.findMany();
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    await prisma.$disconnect(); // penting untuk menghindari memory leak
  }
}


export async function getCategoryById(id: string) {
  try {
    return await prisma.category.findFirst({
      where: {
        id: Number.parseInt(id)
      }
    })
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect(); // penting untuk menghindari memory leak
  }
}