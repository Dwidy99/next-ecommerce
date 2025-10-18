import PaymentStatus from "../_components/payment-status";

export default async function PaymentDetailPage({
  params,
}: {
  params: { code: string };
}) {
  // misal ambil data order dari API
  const res = await fetch(`/api/order/status?code=${params.code}`);
  const data = await res.json();

  return <PaymentStatus status={data.status} code={data.code} />;
}
