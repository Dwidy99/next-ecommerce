"use client";
import { useCart } from "@/hooks/useCart";
import { rupiahFormat } from "@/lib/utils";
import React, { useActionState, useEffect, useMemo } from "react";
import { useFormStatus } from "react-dom";
import { storeOrder } from "../lib/actions";
import { ActionResult } from "@/types";

const initialState: ActionResult = { error: "" };

function FieldError({ keyword, error }: { keyword: string; error?: string }) {
  if (!error || !error.toLowerCase().includes(keyword.toLowerCase()))
    return null;
  return <p className="text-sm text-red-500 px-2">{error}</p>;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="p-3 sm:p-[12px_24px] bg-[#12007a] rounded-full text-center font-semibold text-white w-full hover:bg-[#3a2ea1] transition disabled:opacity-70"
    >
      {pending ? "Processing..." : "Checkout Now"}
    </button>
  );
}

export default function CheckoutForm() {
  const { products } = useCart();
  const grandTotal = useMemo(
    () => products.reduce((prev, curr) => prev + curr.price * curr.quantity, 0),
    [products]
  );

  const storeOrderParams = (_: unknown, formData: FormData) =>
    storeOrder(_, formData, grandTotal, products);

  const [state, formAction] = useActionState(storeOrderParams, initialState);

  useEffect(() => {
    if (state?.redirectUrl) window.location.href = state.redirectUrl;
  }, [state?.redirectUrl]);

  return (
    <form
      action={formAction}
      id="checkout-info"
      className="flex flex-col lg:flex-row justify-between gap-6 mt-10 pb-24"
    >
      {/* Left: Shipping Address */}
      <div className="flex-1 flex flex-col gap-4 bg-white border border-[#E5E5E5] rounded-3xl p-5 sm:p-8">
        <h2 className="font-bold text-xl sm:text-2xl">Shipping Address</h2>

        {state?.error && (
          <p className="text-red-500 font-semibold">{state.error}</p>
        )}

        <div className="space-y-4">
          {["name", "address", "city", "postal_code", "phone"].map((field) => (
            <div key={field}>
              <input
                type={field === "postal_code" ? "number" : "text"}
                name={field}
                placeholder={
                  field === "name"
                    ? "Full name"
                    : field === "address"
                      ? "Complete address"
                      : field === "city"
                        ? "City"
                        : field === "postal_code"
                          ? "Postal code"
                          : "Phone / WhatsApp"
                }
                className="w-full border border-[#E5E5E5] rounded-full px-5 py-3 text-sm font-medium placeholder:text-[#616369] focus:ring-2 focus:ring-[#FFC736] outline-none"
                required={field !== "notes"}
              />
              <FieldError keyword={field} error={state?.error} />
            </div>
          ))}
          <textarea
            name="notes"
            placeholder="Additional notes for courier"
            rows={4}
            className="w-full border border-[#E5E5E5] rounded-2xl p-4 text-sm font-medium placeholder:text-[#616369] focus:ring-2 focus:ring-[#FFC736] outline-none resize-none"
          ></textarea>
        </div>
      </div>

      {/* Right: Payment */}
      <div className="flex-1 flex flex-col gap-4 h-fit">
        <h2 className="font-bold text-xl sm:text-2xl">Payment Details</h2>

        <div className="bg-white border border-[#E5E5E5] rounded-3xl p-5 sm:p-8 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Subtotal</span>
            <span>{rupiahFormat(grandTotal)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-semibold">Grand Total</span>
            <span className="text-xl sm:text-2xl font-bold text-[#12007a]">
              {rupiahFormat(grandTotal)}
            </span>
          </div>

          <SubmitButton />

          <button
            type="button"
            className="p-3 sm:p-[12px_24px] bg-white rounded-full text-center font-semibold border border-[#E5E5E5] w-full hover:bg-gray-50 transition"
          >
            Contact Sales
          </button>
        </div>
      </div>
    </form>
  );
}
