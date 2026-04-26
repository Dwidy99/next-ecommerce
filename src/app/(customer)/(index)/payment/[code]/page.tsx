import PaymentStatus from "../_components/payment-status";
import { getOrderStatusByCode } from "../lib/data";

export default async function PaymentDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const order = await getOrderStatusByCode(code);

  return <PaymentStatus status={order?.status ?? "pending"} code={order?.code ?? code} />;
}
