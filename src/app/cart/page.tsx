import type { Metadata } from "next";
import CartPage from "@/components/features/cart/CartPage";
import { getFeatured } from "@/packages/data/products";

export const metadata: Metadata = {
  title: "Your Cart — SixTeal",
};

export default async function Page() {
  // "You Might Also Like" suggestions — swap for a real recommendation
  // engine later; getFeatured is a reasonable stand-in for now.
  const suggestions = await getFeatured(4);
  return <CartPage suggestions={suggestions} />;
}
