"use client";
import { useCart } from "@/hooks/useCart";
import { rupiahFormat } from "@/lib/utils";
import React, { useActionState, useEffect, useMemo } from "react";
import { useFormStatus } from "react-dom";
import { storeOrder } from "../lib/actions";
import { ActionResult } from "@/app/(customer)/types";

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
      className="w-full rounded-full bg-[#12007a] p-3 text-center font-semibold text-white transition hover:bg-[#3a2ea1] disabled:opacity-70 sm:px-6 sm:py-3"
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
      className="mt-10 flex flex-col gap-6 pb-24 lg:flex-row lg:justify-between"
    >
      {/* Left: Shipping Address */}
      <div className="flex flex-1 flex-col gap-4 rounded-3xl border border-[#E5E5E5] bg-white p-5 sm:p-8">
        <h2 className="text-xl font-bold sm:text-2xl">Shipping Address</h2>

        {state?.error && (
          <p className="font-semibold text-red-500">{state.error}</p>
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
                className="w-full rounded-full border border-[#E5E5E5] px-5 py-3 text-sm font-medium outline-none placeholder:text-[#616369] focus:ring-2 focus:ring-[#FFC736]"
                required={field !== "notes"}
              />
              <FieldError keyword={field} error={state?.error} />
            </div>
          ))}
          <textarea
            name="notes"
            placeholder="Additional notes for courier"
            rows={4}
            className="w-full resize-none rounded-2xl border border-[#E5E5E5] p-4 text-sm font-medium outline-none placeholder:text-[#616369] focus:ring-2 focus:ring-[#FFC736]"
          ></textarea>
        </div>
      </div>

      {/* Right: Payment */}
      <div className="flex h-fit flex-1 flex-col gap-4">
        <h2 className="text-xl font-bold sm:text-2xl">Payment Details</h2>

        <div className="flex flex-col gap-6 rounded-3xl border border-[#E5E5E5] bg-white p-5 sm:p-8">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Subtotal</span>
            <span>{rupiahFormat(grandTotal)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-semibold">Grand Total</span>
            <span className="text-xl font-bold text-[#12007a] sm:text-2xl">
              {rupiahFormat(grandTotal)}
            </span>
          </div>

          <SubmitButton />

          <button
            type="button"
            className="w-full rounded-full border border-[#E5E5E5] bg-white p-3 text-center font-semibold transition hover:bg-gray-50 sm:px-6 sm:py-3"
          >
            Contact Sales
          </button>
        </div>
      </div>
    </form>
  );
}
