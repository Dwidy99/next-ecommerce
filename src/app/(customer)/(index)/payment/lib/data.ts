"use server";

import { getUser } from "@/lib/auth";
import { prisma } from "lib/prisma";

export async function getPurchaseHistory() {
  const { user } = await getUser();
  if (!user) return { error: "Unauthorized", orders: [] };

  try {
    const orders = await prisma.order.findMany({
      where: { user_id: user.id },
      orderBy: { created_at: "desc" },
      include: {
        detail: true,
        products: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                images: true,
              },
            },
          },
        },
      },
    });

    return {
      orders: orders.map((order) => ({
        ...order,
        total: Number(order.total),
        created_at: order.created_at.toISOString(),
        updated_at: order.updated_at.toISOString(),
      })),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to fetch purchase history:", error);
    return { error: message, orders: [] };
  }
}
