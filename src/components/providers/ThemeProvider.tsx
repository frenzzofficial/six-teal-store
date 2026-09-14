"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { themeConfig } from "@/packages/configs/theme.config";

type ThemeProviderProps = {
  children: React.ReactNode;
};

/**
 * Thin wrapper around next-themes, configured entirely from
 * theme.config.ts. `next-themes` was already a dependency and this file
 * existed as an empty scaffold — it was never actually wired up, so the
 * app rendered with no theme provider at all. This is that wiring.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  return <NextThemesProvider {...themeConfig}>{children}</NextThemesProvider>;
}
