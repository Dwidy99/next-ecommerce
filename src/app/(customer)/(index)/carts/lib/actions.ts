"use server";

import { getUser } from "@/lib/auth";
import { schemaShippingAddress } from "@/lib/schema";
import { generateRandomString } from "@/lib/utils";
import xenditClient from "@/lib/xendit";
import { ActionResult, TCart } from "@/app/(customer)/types";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { PaymentRequest, PaymentRequestParameters } from "xendit-node/payment_request/models";
import { prisma } from "lib/prisma";

const MIN_CHECKOUT_TOTAL = 100;
const MAX_CHECKOUT_TOTAL = 20_000_000;

// CREATE
export async function storeOrder(
  _: unknown,
  formData: FormData,
  total: number,
  products: TCart[],
): Promise<ActionResult> {
  if (total < MIN_CHECKOUT_TOTAL || total > MAX_CHECKOUT_TOTAL) {
    return {
      error: "Total must be between Rp100 and Rp20.000.000 for Xendit checkout",
    };
  }

  const { session, user } = await getUser();
  if (!session) redirect("/");

  const parsed = schemaShippingAddress.safeParse({
    name: formData.get("name"),
    address: formData.get("address"),
    city: formData.get("city"),
    postal_code: formData.get("postal_code"),
    notes: formData.get("notes"),
    phone: formData.get("phone"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid shipping address" };
  }

  let order: { id: number; code: string } | null = null;
  let redirectPaymentUrl = "/";

  try {
    order = await prisma.order.create({
      data: {
        total,
        status: "pending",
        user_id: user.id,
        code: generateRandomString(15),
      },
    });

    const paymentRequest: PaymentRequestParameters = {
      amount: total,
      currency: "IDR",
      referenceId: order.code,
      paymentMethod: {
        type: "EWALLET",
        reusability: "ONE_TIME_USE",
        ewallet: {
          channelCode: "SHOPEEPAY",
          channelProperties: {
            successReturnUrl: buildPaymentReturnUrl(order.code, "success"),
          },
        },
      },
    };

    const paymentResponse = await xenditClient.PaymentRequest.createPaymentRequest({
      data: paymentRequest,
    });

    redirectPaymentUrl = getPaymentRedirectUrl(paymentResponse);

    await prisma.orderProduct.createMany({
      data: buildOrderProducts(products, order.id),
    });

    await prisma.orderDetail.create({
      data: {
        address: parsed.data.address,
        city: parsed.data.city,
        name: parsed.data.name,
        phone: parsed.data.phone,
        postal_code: parsed.data.postal_code,
        order_id: order.id,
        notes: parsed.data.notes ?? "",
      },
    });
  } catch (error) {
    console.error("Failed to checkout customer order:", error);
    return { error: "Failed to checkout" };
  }

  return {
    error: "",
    redirectUrl: redirectPaymentUrl,
    code: order?.code ?? "",
  };
}

// MAPPERS
function buildOrderProducts(products: TCart[], orderId: number) {
  return products.map<Prisma.OrderProductCreateManyInput>((product) => ({
    order_id: orderId,
    product_id: product.id,
    quantity: product.quantity ?? 1,
    subtotal: product.price * (product.quantity ?? 1),
  }));
}

function getPaymentRedirectUrl(response: PaymentRequest) {
  return response.actions?.find((action) => action.urlType === "DEEPLINK")?.url ?? "/";
}

function buildPaymentReturnUrl(code: string, status: "success" | "failed") {
  const appUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_REDIRECT_URL ||
    "http://localhost:3000";
  const baseUrl =
    process.env.NEXT_PUBLIC_REDIRECT_PAYMENT_URL ||
    `${appUrl}/payment/${status}`;

  const url = new URL(baseUrl, appUrl);
  url.searchParams.set("code", code);

  return url.toString();
}
