import type { Metadata } from "next";
import { ConfirmationPage } from "@/components/features/checkout/ConfirmationPage";

export const metadata: Metadata = {
  title: "Order Confirmed — SixTeal",
};

export default function Page() {
  return <ConfirmationPage />;
}
