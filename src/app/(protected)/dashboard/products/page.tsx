import type { Metadata } from "next";
import ProductsPage from "@/components/features/dashboard/products/ProductsPage";

export const metadata: Metadata = { title: "Products" };

export default function Page() {
  return <ProductsPage />;
}
