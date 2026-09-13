"use client";

import { usePathname } from "next/navigation";

/**
 * Returns a matcher for "is this nav item the current route". Backs the
 * `.nav-link--active` / `.nav-sidebar__link--active` / `.nav-mobile__tab--active`
 * styling — those CSS classes and NavigationProvider's `activeHref` field
 * already existed but nothing ever computed or applied them, so every nav
 * item only ever looked "active" while the mouse happened to be over it.
 *
 * "/" only matches the exact homepage; every other href matches itself and
 * any nested route below it (e.g. "/products" also covers
 * "/products/123").
 */
export function useIsActivePath() {
  const pathname = usePathname();

  return (href: string) => {
    if (href === "/") return pathname === "/";
    // Strip a query string before comparing — several config hrefs like
    // "/products?category=fashion" carry one, but route matching should
    // only look at the path.
    const path = href.split("?")[0];
    return pathname === path || pathname.startsWith(`${path}/`);
  };
}
