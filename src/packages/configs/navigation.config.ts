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
    title: "Explore",
    href: appConfig.routes.navigations.explore,
  },
  {
    id: "trending",
    title: "Trending",
    href: appConfig.routes.navigations.trending,
  },
  {
    id: "products",
    title: "Products",
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
    title: "Shop",
    items: [
      { label: "All Products", href: appConfig.routes.navigations.products },
      { label: "Explore", href: appConfig.routes.navigations.explore },
      { label: "Trending", href: appConfig.routes.navigations.trending },
      { label: "Wishlist", href: appConfig.routes.actions.wishlist },
      { label: "Cart", href: appConfig.routes.actions.cart },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About Us", href: appConfig.routes.about },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: appConfig.routes.legal.contact },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "My Orders", href: "/account/orders" },
      { label: "Privacy Policy", href: appConfig.routes.legal.privacy },
      { label: "Terms of Service", href: appConfig.routes.legal.terms },
    ],
  },
];
