import type { Metadata } from "next";
import appConfig from "../configs/app.config";

export const seo: Metadata = {
  title: appConfig.app.name,
  description: appConfig.app.description,
  openGraph: {
    type: "website",
    url: appConfig.site.url,
    title: appConfig.site.title,
    description: appConfig.app.description,
    images: [
      {
        url: `${appConfig.site.url}${appConfig.site.ogImage}`,
        width: 1200,
        height: 630,
        alt: appConfig.app.name,
      },
    ],
    siteName: appConfig.app.name,
  },
  twitter: {
    card: "summary_large_image",
    title: appConfig.app.name,
    description: appConfig.app.description,
    images: [
      {
        url: `${appConfig.site.url}${appConfig.site.ogImage}`,
        width: 1200,
        height: 630,
        alt: appConfig.app.name,
      },
    ],
    site: appConfig.author.name,
  },
};
