"use client";

import { LucideLibrary, Link as NavLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useNavigation } from "@/components/providers/NavigationProvider";
import { navigationConfig } from "@/packages/configs/navigation.config";
import { NavSidebar } from "../sidebar/NavSidebar";

const NAV_KEY = "main";

const NavbarMobile = () => {
  const { state, toggleSidebar, closeSidebar } = useNavigation(NAV_KEY);
  const { logo, mobile, actions } = navigationConfig;

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

      {/* Bottom tab bar — thumb-reach primary navigation */}
      <nav className="nav-mobile__tabbar" aria-label="Primary">
        {mobile.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            name={item.name}
            // icon={item.icon}
            // showIcon
            className="nav-mobile__tab"
            // activeClassName="nav-mobile__tab--active"
          />
        ))}
      </nav>

      <NavSidebar
        navKey={NAV_KEY}
        open={state.sidebarOpen}
        onClose={closeSidebar}
      />
    </div>
  );
};

export default NavbarMobile;
