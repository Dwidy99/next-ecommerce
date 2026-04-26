import PaymentStatus from "../_components/payment-status";
import { updateOrderStatusByCode } from "../lib/data";

type PaymentFailedPageProps = {
  searchParams?: Promise<{
    code?: string;
  }>;
};

export default async function PaymentFailedPage({
  searchParams,
}: PaymentFailedPageProps) {
  const params = await searchParams;
  const order = await updateOrderStatusByCode(params?.code, "failed");

  return <PaymentStatus status="failed" code={order?.code ?? params?.code} />;
}
