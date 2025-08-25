import "../styles/globals.css";

import { RootLayoutData } from "@/types/app";
import { poppins, roboto } from "@/libs/configs/config.styles";
import LayoutProvider from "@/components/providers/LayoutProvider";
import { getHomePageLayoutData, getRootLayoutData } from "@/libs/api/api.fetch";

import { Metadata } from "next";
import SEO from "@/libs/seo/seo.homepage";
import { ProductDetails } from "@/types/products";
import StoreProvider from "@/components/providers/StoreProvider";

export const metadata: Metadata = SEO;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rootLayoutJson: Promise<RootLayoutData | null> = getRootLayoutData();
  const rootLayoutData = await rootLayoutJson;

  const homePageLayoutJson: Promise<ProductDetails | null> =
    getHomePageLayoutData();
  const homePageLayoutData = await homePageLayoutJson;

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${poppins.variable} antialiased relative scroll-smooth`}
      >
        <StoreProvider>
          <LayoutProvider
            RootLayoutData={rootLayoutData}
            HomePageLayoutData={homePageLayoutData}
          >
            {children}
          </LayoutProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
