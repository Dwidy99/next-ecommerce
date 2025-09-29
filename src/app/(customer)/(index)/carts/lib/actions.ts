"use server"
import { getUser } from "@/lib/auth";
import { schemaShippingAddress } from "@/lib/schema";
import { generateRandomString } from "@/lib/utils";
import { ActionResult, TCart } from "@/types";
import { redirect } from "next/navigation";
import { PaymentRequestParameters, PaymentRequest } from 'xendit-node/payment_request/models';
import xenditClient from '@/lib/xendit';
import { prisma } from "lib/prisma";
import { Prisma } from "@prisma/client";


export async function storeOrder(
    _: unknown,
    formData: FormData,
    total: number,
    products: TCart[],
): Promise<ActionResult> {

    console.log("✅ storeOrder is called");

    if (total < 100 || total > 20_000_000) {
        return {
            error: "Total harus antara Rp100 sampai Rp20.000.000 sesuai batas Xendit",
        };
    }

    const { session, user } = await getUser();

    if (!session) {
        return redirect("/")
    }

    const parse = schemaShippingAddress.safeParse({
        name: formData.get("name"),
        address: formData.get("address"),
        city: formData.get("city"),
        postal_code: formData.get("postal_code"),
        notes: formData.get("notes"),
        phone: formData.get("phone"),
    });

    if (!parse.success) {
        return {
            error: parse.error.issues[0].message,
        };
    }


    let redirectPaymentUrl = "/"

    try {
        const order = await prisma.order.create({
            data: {
                total: total,
                status: "pending",
                user_id: user.id,
                code: generateRandomString(15)
            }
        })

        console.log(order)

        const data: PaymentRequestParameters = {
            amount: total,
            paymentMethod: {
                ewallet: {
                    channelProperties: {
                        successReturnUrl: process.env.NEXT_PUBLIC_REDIRECT_URL
                    },
                    channelCode: "SHOPEEPAY"
                },
                reusability: "ONE_TIME_USE",
                type: "EWALLET"
            },
            currency: "IDR",
            referenceId: order.code
        }


        const response = await xenditClient.PaymentRequest.createPaymentRequest({ data });
        console.log("response.actions", response);

        redirectPaymentUrl = response.actions?.find(
            (val) => val.urlType === "DEEPLINK"
        )?.url ?? "/";
        console.log(redirectPaymentUrl)

        // ⛔ JANGAN langsung redirect di sini

        // 🛠️ Lanjut insert product ke order
        const queryCreateProductOrder: Prisma.OrderProductCreateManyInput[] = [];

        for (const product of products) {
            queryCreateProductOrder.push({
                order_id: order.id,
                product_id: product.id,
                quantity: product.quantity ?? 1, // jangan lupa quantity
                subtotal: product.price, // jika schema butuh
            });
        }

        // createMany
        await prisma.orderProduct.createMany({
            data: queryCreateProductOrder,
        });

        await prisma.orderDetail.create({
            data: {
                address: parse.data.address,
                city: parse.data.city,
                name: parse.data.name,
                phone: parse.data.phone,
                postal_code: parse.data.postal_code,
                order_id: order.id,
                notes: parse.data.notes ? parse.data.notes : '',
            }
        })



    } catch (err) {
        console.log(err);

        return {
            error: "Failed to checkout"
        }
    }
    // ✅ kirim link balik ke client
    return {
        error: "",
        redirectUrl: redirectPaymentUrl,
    };
}