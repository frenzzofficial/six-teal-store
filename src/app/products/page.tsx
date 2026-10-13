import type { Metadata } from "next";
import ProductsPage from "@/components/features/products/ProductsPage";

export const metadata: Metadata = {
  title: "All Products — SixTeal",
};

// Typed inline rather than via Next's generated PageProps helper — that
// type only exists after `next build`/`next dev` has run once and
// written .next/types, which this doesn't assume.
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  return <ProductsPage searchParams={params} />;
}
