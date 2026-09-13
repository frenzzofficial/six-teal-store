"use client";

import Image from "next/image";
import Link from "next/link";
import { useNavigation } from "@/components/providers/NavigationProvider";
import { LucideLibrary } from "@/components/ui";
import { navigationConfig } from "@/packages/configs/navigation.config";
import { NavMenuDrawer } from "../drawer/NavMenuDrawer";

const NAV_KEY = "main";

/**
 * Mobile now shares the same "sidebar design" (hamburger + Drawer menu) as
 * NavbarTablet, instead of the old fixed bottom tab bar — one navigation
 * mechanism per breakpoint rather than two competing ones. See
 * NavMenuDrawer for the actual menu content.
 */
const NavbarMobile = () => {
  const { state, toggleSidebar, closeSidebar } = useNavigation(NAV_KEY);
  const { logo, actions } = navigationConfig;

  return (
    <div className="nav-mobile">
      <div className="nav-mobile__topbar">
        <button
          type="button"
          className="nav-hamburger"
          onClick={toggleSidebar}
          aria-label="Open menu"
          aria-expanded={state.sidebarOpen}
        >
          <LucideLibrary name="menu" className="nav-hamburger__icon" />
        </button>

        <Link href="/" className="nav-mobile__logo" aria-label={logo.alt}>
          <Image
            src={logo.src}
            alt={logo.alt}
            width={96}
            height={48}
            priority
          />
        </Link>

        <Link
          href={actions.cart.href}
          className="nav-icon-btn nav-icon-btn--cart"
          aria-label={actions.cart.name}
        >
          <LucideLibrary
            name={actions.cart.icon}
            className="nav-icon-btn__icon"
          />
        </Link>
      </div>

      <NavMenuDrawer
        navKey={NAV_KEY}
        open={state.sidebarOpen}
        onClose={closeSidebar}
      />
    </div>
  );
};

export default NavbarMobile;
