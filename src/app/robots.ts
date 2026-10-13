import type { MetadataRoute } from "next";
import appConfig from "@/packages/configs/app.config";

/**
 * robots.ts
 * --------------------------------------------------------------
 * Same situation as sitemap.ts — app.config.ts's `routes.robots` has
 * referenced "/robots.txt" from the start, nothing generated it. Next's
 * app router convention (this file) serves it at /robots.txt
 * automatically.
 */
export default function robots(): MetadataRoute.Robots {
  const base = appConfig.site.url;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Checkout is a multi-step flow gated on cart/session state —
        // there's nothing indexable there, and a crawler hitting
        // /checkout/payment directly would just bounce through the
        // redirect guards.
        disallow: ["/checkout/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
