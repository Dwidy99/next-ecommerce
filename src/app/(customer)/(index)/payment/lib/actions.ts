"use server";

import { getUser } from "@/lib/auth";
import xenditClient from "@/lib/xendit";
import { PaymentRequestParameters } from "xendit-node/payment_request/models";
import { ActionResult } from "@/types";
import { prisma } from "lib/prisma";
import { StatusOrder } from "@prisma/client";

export async function repayOrder(_: unknown, formData: FormData): Promise<ActionResult> {
    const { session, user } = await getUser();
    if (!session) return { error: "Unauthorized" };

    const code = formData.get("code")?.toString();
    if (!code) return { error: "Order code is required" };

    try {
        const order = await prisma.order.findFirst({
            where: { code, user_id: user.id, status: "pending" },
        });

        if (!order) {
            return { error: "Order not found or not pending" };
        }

        const data: PaymentRequestParameters = {
            amount: Number(order.total),
            currency: "IDR",
            referenceId: order.code,
            paymentMethod: {
                type: "EWALLET",
                reusability: "ONE_TIME_USE",
                ewallet: {
                    channelCode: "SHOPEEPAY",
                    channelProperties: {
                        successReturnUrl: `${process.env.NEXT_PUBLIC_REDIRECT_PAYMENT_URL}?code=${order.code}`,
                    },
                },
            },
        };

        const response = await xenditClient.PaymentRequest.createPaymentRequest({ data });
        const redirectUrl =
            response.actions?.find((val) => val.urlType === "DEEPLINK")?.url ??
            response.actions?.find((val) => val.urlType === "WEB")?.url ??
            "/";

        return { error: "", redirectUrl, code: order.code };
    } catch (err) {
        console.error("repayOrder error:", err);
        return { error: "Failed to re-create payment" };
    }
}


export async function cancelOrder(_: unknown, code: string): Promise<ActionResult> {
    const { session, user } = await getUser();
    if (!session) return { error: "Unauthorized" };

    if (!code) return { error: "Order code is required" };

    try {
        const order = await prisma.order.findFirst({
            where: { code, user_id: user.id, status: "pending" },
        });

        if (!order) {
            return { error: "Order not found or already processed" };
        }


        console.log('order:', order)

        await prisma.order.update({
            where: { id: order.id },
            data: {
                status: StatusOrder.cancelled
            },
        });

        return { error: "", code: order.code, redirectUrl: `/payment/success?code=${order.code}` };
    } catch (err) {
        console.error("cancelOrder error:", err);
        return { error: "Failed to cancel payment" };
    }
}