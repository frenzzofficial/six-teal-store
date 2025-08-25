"use client";
import "@/styles/components/Header.css";
import { RootLayoutData } from "@/types/app";
import React, { useEffect, useRef } from "react";

import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { useDispatch } from "react-redux";
import FontsProvider from "./FontsProvider";
import ThemesProvider from "./ThemesProvider";
import { Toaster } from "../ui/shadcn/sonner";
import { AppDispatch } from "@/libs/store/store";
import { ProductDetails } from "@/types/products";
import AuthformProvider from "./AuthformProvider";
import { AnimationProvider } from "./AnimationProvider";
import { HamburgerMenuProvider } from "./HamburgerProvider";
import { useBreakpoint } from "@/libs/hooks/use-breakpoints";
import Animate_header from "../ui/animations/Animate_header";
import { setHomepageProductsData } from "@/libs/store/features/productsSlice";

interface LayoutProviderProps {
  headerActive?: boolean;
  footerActive?: boolean;
  children: React.ReactNode;
  RootLayoutData?: RootLayoutData | null;
  HomePageLayoutData?: ProductDetails | null;
}

const LayoutProvider = ({
  children,
  RootLayoutData,
  headerActive = true,
  footerActive = true,
  HomePageLayoutData,
}: LayoutProviderProps) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const headerRef = useRef<HTMLDivElement>(null);
  const { header, footer } = RootLayoutData ?? {};
  const height = headerRef.current?.offsetHeight;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!HomePageLayoutData) return;
    dispatch(setHomepageProductsData(HomePageLayoutData));
    return () => {};
  }, [HomePageLayoutData, dispatch]);

  return (
    <>
      <ThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <FontsProvider>
          <AnimationProvider>
            <AuthformProvider>
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
                      headerConfig={header}
                      isAuthenticated={false}
                    />
                  )}
                  {children}
                </HamburgerMenuProvider>
              </main>
            </AuthformProvider>
            <Toaster />
            <Animate_header refObject={headerRef} />
            {footerActive && footer && <Footer footerConfig={footer} />}
          </AnimationProvider>
        </FontsProvider>
      </ThemesProvider>
    </>
  );
};

export default LayoutProvider;
