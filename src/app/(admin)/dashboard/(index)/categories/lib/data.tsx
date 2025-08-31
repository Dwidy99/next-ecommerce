import { PrismaClient } from '@prisma/client/extension';

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
