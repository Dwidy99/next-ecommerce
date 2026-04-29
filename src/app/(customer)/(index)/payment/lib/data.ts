"use server";

import { getCustomerUser } from "@/lib/auth";
import { getImageUrl } from "@/lib/supabase";
import type { StatusOrder } from "@prisma/client";
import { prisma } from "lib/prisma";

const SIMULATED_PAYMENT_SUCCESS_DELAY_MS = 9000;

// READ LIST
export async function getPurchaseHistory() {
  const { user } = await getCustomerUser();
  if (!user) return { error: "Unauthorized", orders: [] };

  try {
    await syncSimulatedSuccessfulOrders(user.id);

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
        products: order.products.map((item) => ({
          ...item,
          subtotal: Number(item.subtotal),
          product: {
            ...item.product,
            price: Number(item.product.price),
            images: item.product.images.map((image) =>
              getImageUrl(image, "products"),
            ),
          },
        })),
      })),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to fetch purchase history:", error);
    return { error: message, orders: [] };
  }
}

// READ DETAIL
export async function getOrderStatusByCode(code: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { code },
      select: {
        id: true,
        code: true,
        status: true,
        created_at: true,
      },
    });

    if (!order) return null;

    if (order.status === "pending") {
      const diff = Date.now() - order.created_at.getTime();

      if (diff > SIMULATED_PAYMENT_SUCCESS_DELAY_MS) {
        return await prisma.order.update({
          where: { code },
          data: { status: "success" },
          select: {
            id: true,
            code: true,
            status: true,
            created_at: true,
          },
        });
      }
    }

    return order;
  } catch (error) {
    console.error("Failed to fetch order status:", error);
    return null;
  }
}

async function syncSimulatedSuccessfulOrders(userId: number) {
  const paidAfter = new Date(Date.now() - SIMULATED_PAYMENT_SUCCESS_DELAY_MS);

  await prisma.order.updateMany({
    where: {
      user_id: userId,
      status: "pending",
      created_at: {
        lte: paidAfter,
      },
    },
    data: {
      status: "success",
    },
  });
}

// UPDATE
export async function updateOrderStatusByCode(
  code: string | undefined,
  status: StatusOrder,
) {
  if (!code) return null;

  try {
    return await prisma.order.update({
      where: { code },
      data: { status },
      select: {
        id: true,
        code: true,
        status: true,
      },
    });
  } catch (error) {
    console.error("Failed to update order status:", error);
    return null;
  }
}
