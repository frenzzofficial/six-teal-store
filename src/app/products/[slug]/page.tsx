import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/components/features/products/ProductDetailPage";
import { getProductBySlug, getRelated } from "@/packages/data/products";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found — SixTeal" };
  return {
    title: `${product.name} — SixTeal`,
    description: product.description,
  };
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelated(product.id, 4);

  return <ProductDetailPage product={product} related={related} />;
}
