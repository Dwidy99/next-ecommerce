"use server";

import type { StatusOrder } from "@prisma/client";
import { prisma } from "lib/prisma";

// UPDATE: Mark an order as success or failed after payment callback pages load.
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
