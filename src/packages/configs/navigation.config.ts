import type { NavSection, NavTab } from "@/types/navigation";
import appConfig from "./app.config";

/** Desktop nav shows at/above this width. Keep in sync with the 1024px breakpoints in styles/ui/*.css. */
export const DESKTOP_NAV_MEDIA_QUERY = "(min-width: 1024px)";

/** id of the mobile drawer panel — the hamburger's aria-controls target. */
export const MOBILE_MENU_ID = "mobile-menu";

export const mainNav: NavTab[] = [
  { id: "home", title: "Home", href: appConfig.routes.home },
  {
    id: "explore",
    title: "explore",
    href: appConfig.routes.navigations.explore,
  },
  {
    id: "trending",
    title: "trending",
    href: appConfig.routes.navigations.trending,
  },
  {
    id: "products",
    title: "products",
    href: appConfig.routes.navigations.products,
  },
];

export const navActions: NavTab[] = [
  { id: "search", title: "search", href: appConfig.routes.actions.search },
  {
    id: "wishlist",
    title: "wishlist",
    href: appConfig.routes.actions.wishlist,
  },
  { id: "account", title: "account", href: appConfig.routes.actions.account },
  { id: "cart", title: "cart", href: appConfig.routes.actions.cart },
];

export const footerNav: NavSection[] = [
  {
    title: "Explore",
    items: [{ label: "Home", href: appConfig.routes.home }],
  },
  {
    title: "categories",
    items: [
      {
        label: "explore",
        href: appConfig.routes.navigations.explore,
      },
      { label: "products", href: appConfig.routes.navigations.products },
      {
        label: "trending",
        href: appConfig.routes.navigations.trending,
      },
    ],
  },
  {
    title: "Connect",
    items: [
      { label: "Contact", href: appConfig.routes.legal.contact },
      { label: "Privacy", href: appConfig.routes.legal.privacy },
      { label: "Terms", href: appConfig.routes.legal.terms },
    ],
  },
];
