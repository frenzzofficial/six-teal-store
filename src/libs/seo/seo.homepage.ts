import { Metadata } from "next";
import { envFrontendConfig } from "../env/env.frontend";

const frontendUrl = envFrontendConfig.APP_FRONTEND;

const SEO: Metadata = {
  title: "Six Teal Store",
  description:
    "Six Teal Store - an ecommerce platform focused on six category and high class products.",
  keywords: "Six Teal Store",
  openGraph: {
    title: "Six Teal Store - A brand for high class",
    description: "Explore Six Teal Store",
    url: frontendUrl,
    siteName: "Six Teal Store",
    images: [
      {
        url: `${frontendUrl}/api/og?title=Six Teal App&subtitle=Elegant DX for Modern Web&author=sixteal&theme=teal`,
        width: 1200,
        height: 630,
        alt: "Six Teal Store",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Six Teal Store - A brand for high class",
    description: " Six Teal Store - A brand for high class",
    images: [`${frontendUrl}/og-image.jpg`],
    creator: "@vivekcsein",
  },
  authors: [{ name: "Vivek CSEIN", url: frontendUrl }],
  creator: "Vivek CSEIN",
  publisher: "sixteal",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
};

export default SEO;
