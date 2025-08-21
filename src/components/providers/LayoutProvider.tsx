"use client";
import React, { useRef } from "react";
import "@/styles/components/Header.css";
import { RootLayoutData } from "@/types/app";

import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import FontsProvider from "./FontsProvider";
import StoreProvider from "./StoreProvider";
import ThemesProvider from "./ThemesProvider";
import { Toaster } from "../ui/shadcn/sonner";
import { HamburgerMenuProvider } from "./HamburgerProvider";
import { useBreakpoint } from "@/libs/hooks/use-breakpoints";
import Animate_header from "../ui/animations/Animate_header";

interface LayoutProviderProps {
  headerActive?: boolean;
  footerActive?: boolean;
  children: React.ReactNode;
  RootLayoutData?: RootLayoutData | null;
}

const LayoutProvider = ({
  children,
  RootLayoutData,
  headerActive = true,
  footerActive = true,
}: LayoutProviderProps) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const headerRef = useRef<HTMLDivElement>(null);
  const { header, footer } = RootLayoutData ?? {};
  const height = headerRef.current?.offsetHeight;

  return (
    <>
      <ThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <FontsProvider>
          <StoreProvider>
            <main
              style={{ minHeight: "100vh", paddingTop: `${height ?? 0}px` }}
            >
              <HamburgerMenuProvider>
                {headerActive && header && (
                  <Header
                    isMobile={isMobile}
                    isTablet={isTablet}
                    isDesktop={isDesktop}
                    refObject={headerRef}
                    isAuthenticated={true}
                    headerConfig={header}
                  />
                )}
                {children}
              </HamburgerMenuProvider>
            </main>
            <Toaster />
          </StoreProvider>
          <Animate_header refObject={headerRef} />
          {footerActive && footer && <Footer footerConfig={footer} />}
        </FontsProvider>
      </ThemesProvider>
    </>
  );
};

export default LayoutProvider;
