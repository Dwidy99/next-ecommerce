import PaymentStatus from "../_components/payment-status";
import { updateOrderStatusByCode } from "../lib/data";

type PaymentSuccessPageProps = {
  searchParams?: Promise<{
    code?: string;
  }>;
};

export default async function PaymentSuccessPage({
  searchParams,
}: PaymentSuccessPageProps) {
  const params = await searchParams;
  const order = await updateOrderStatusByCode(params?.code, "success");

  return <PaymentStatus status="success" code={order?.code ?? params?.code} />;
}
