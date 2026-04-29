import PaymentStatus from "../_components/payment-status";
import { updateOrderStatusByCode } from "../lib/actions";
import type { PaymentResultPageProps } from "@/app/(customer)/types";

export default async function PaymentFailedPage({
  searchParams,
}: PaymentResultPageProps) {
  const params = await searchParams;
  const order = await updateOrderStatusByCode(params?.code, "failed");

  return <PaymentStatus status="failed" code={order?.code ?? params?.code} />;
}

