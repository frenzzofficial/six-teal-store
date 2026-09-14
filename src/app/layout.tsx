import "@/styles/globals.css";
import type { Metadata } from "next";
import AppClientLayout from "@/components/layouts/AppClientLayout";
import { fontMono, fontSans, fontSerif } from "@/packages/configs/fonts.config";
import { seo } from "@/packages/seo/seo.index";
import { cn } from "@/packages/utils/cn";

export const metadata: Metadata = seo;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn(
        "h-full",
        "antialiased",
        fontSans.variable,
        fontSerif.variable,
        fontMono.variable,
        "font-sans",
      )}
    >
      <body className="min-h-full flex flex-col">
        <AppClientLayout>{children}</AppClientLayout>
      </body>
    </html>
  );
}
