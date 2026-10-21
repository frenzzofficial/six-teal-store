import type { Metadata } from "next";
import { OrdersPage } from "@/components/features/account/OrdersPage";

export const metadata: Metadata = {
  title: "Your Orders — SixTeal",
};

export default function Page() {
  return <OrdersPage />;
}
