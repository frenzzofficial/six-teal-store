import type { MetadataRoute } from "next";
import appConfig from "@/packages/configs/app.config";
import { getCategories, getProducts } from "@/packages/data/products";

/**
 * sitemap.ts
 * --------------------------------------------------------------
 * app.config.ts's `routes.sitemap` has referenced "/sitemap.xml" since
 * the very first config pass, but nothing generated it — Next's app
 * router convention (this file, at src/app/sitemap.ts) does, and is
 * served automatically at /sitemap.xml.
 *
 * Product/category URLs are generated from the real data layer, not
 * hand-listed, so the sitemap can't silently drift out of sync with the
 * catalog the way a manually maintained list would.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = appConfig.site.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "daily", priority: 1 },
    { url: `${base}/products`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/trending`, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/explore`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/cart`, changeFrequency: "monthly", priority: 0.3 },
  ];

  const [categories, { items: products }] = await Promise.all([
    getCategories(),
    getProducts({ limit: 1000 }),
  ]);

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${base}/products?category=${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/products/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
