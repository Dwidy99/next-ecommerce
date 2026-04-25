import { generatePageSEO } from "@/lib/seo/seo-utils";
import PurchaseHistoryClient from "./purchase-history-client";

export async function generateMetadata() {
  return await generatePageSEO({
    title: "Purchase History",
    description:
      "Review completed payments, pending transactions, and recent order activity.",
    keywords: ["purchase history", "orders", "payments"],
    url: "/payment/purchase-history",
  });
}

export default function PurchaseHistoryPage() {
  return <PurchaseHistoryClient />;
}
