import PaymentStatus from "../_components/payment-status";
import { updateOrderStatusByCode } from "../lib/data";
import type { PaymentResultPageProps } from "@/app/(customer)/types";

export default async function PaymentSuccessPage({
  searchParams,
}: PaymentResultPageProps) {
  const params = await searchParams;
  const order = await updateOrderStatusByCode(params?.code, "success");

  return <PaymentStatus status="success" code={order?.code ?? params?.code} />;
}
