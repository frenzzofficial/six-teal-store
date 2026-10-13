import type { Metadata } from "next";
import { ShippingPage } from "@/components/features/checkout/ShippingPage";

export const metadata: Metadata = {
  title: "Shipping Address — SixTeal",
};

export default function Page() {
  return <ShippingPage />;
}
