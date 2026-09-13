"use client";

import { useEffect, useState } from "react";

/**
 * useMediaQuery.ts
 * --------------------------------------------------------------
 * Subscribes to a CSS media query and returns whether it currently
 * matches, updating live as the viewport (or `prefers-color-scheme`,
 * `prefers-reduced-motion`, etc.) changes.
 *
 * Initializes to `false` on every render before mount — matchMedia isn't
 * available during SSR, and reading it synchronously on the client's
 * first render would make that render disagree with the server-rendered
 * HTML (a hydration mismatch, the same hazard useLocalStorage.ts guards
 * against). The real value is picked up in a `useEffect` immediately
 * after mount instead.
 *
 *   const isDesktop = useMediaQuery("(min-width: 1024px)");
 *
 * `useBreakpoints` (same folder) is a Tailwind-breakpoint-aware
 * convenience layer built on top of this hook — reach for that instead
 * when you're checking against the project's standard breakpoints.
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    setMatches(mediaQueryList.matches);

    const handleChange = (event: MediaQueryListEvent) =>
      setMatches(event.matches);

    mediaQueryList.addEventListener("change", handleChange);
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
};
