import type { Metadata } from "next";
import { PaymentPage } from "@/components/features/checkout/PaymentPage";

export const metadata: Metadata = {
  title: "Payment — SixTeal",
};

export default function Page() {
  return <PaymentPage />;
}
