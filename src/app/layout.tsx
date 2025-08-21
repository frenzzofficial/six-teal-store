import "../styles/globals.css";

import { RootLayoutData } from "@/types/app";
import { getRootLayoutData } from "@/libs/api/api.fetch";
import { poppins, roboto } from "@/libs/configs/config.styles";
import LayoutProvider from "@/components/providers/LayoutProvider";

import { Metadata } from "next";
import SEO from "@/libs/seo/seo.homepage";
export const metadata: Metadata = SEO;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rootLayoutJson: Promise<RootLayoutData | null> = getRootLayoutData();
  const rootLayoutData = await rootLayoutJson;

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${poppins.variable} antialiased relative scroll-smooth`}
      >
        <LayoutProvider RootLayoutData={rootLayoutData}>
          {children}
        </LayoutProvider>
      </body>
    </html>
  );
}
