import type { Metadata } from "next";
import OrdersPage from "@/components/features/dashboard/orders/OrdersPage";

export const metadata: Metadata = { title: "Orders" };

export default function Page() {
  return <OrdersPage />;
}
