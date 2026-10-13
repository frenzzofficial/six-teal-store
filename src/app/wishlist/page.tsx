import type { Metadata } from "next";
import { WishlistPage } from "@/components/features/wishlist/WishlistPage";

export const metadata: Metadata = {
  title: "Your Wishlist — SixTeal",
};

export default function Page() {
  return <WishlistPage />;
}
