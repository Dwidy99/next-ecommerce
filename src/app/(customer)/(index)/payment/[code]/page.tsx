import PaymentStatus from "../_components/payment-status";

export default async function PaymentDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const res = await fetch(`/api/order/status?code=${code}`);
  const data = await res.json();

  return <PaymentStatus status={data.status} code={data.code} />;
}
