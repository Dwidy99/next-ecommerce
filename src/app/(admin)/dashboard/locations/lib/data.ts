import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function getLocations() {
  try {
    return await prisma.location.findMany();
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    await prisma.$disconnect(); // penting untuk menghindari memory leak
  }
}


export async function getLocationById(id: string) {
  try {
    return await prisma.location.findFirst({
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