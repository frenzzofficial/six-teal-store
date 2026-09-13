"use client";

import Image from "next/image";
import Link from "next/link";
import { useNavigation } from "@/components/providers/NavigationProvider";
import { LucideLibrary, Link as NavLink } from "@/components/ui";
import { navigationConfig } from "@/packages/configs/navigation.config";
import { NavSidebar } from "../sidebar/NavSidebar";

const NAV_KEY = "main";

const NavbarTablet = () => {
  const { state, toggleSidebar, closeSidebar, toggleSearch } =
    useNavigation(NAV_KEY);
  const { logo, navbar, actions } = navigationConfig;

  return (
    <div className="nav-tablet">
      <button
        type="button"
        className="nav-hamburger"
        onClick={toggleSidebar}
        aria-label="Open menu"
        aria-expanded={state.sidebarOpen}
      >
        <LucideLibrary name="menu" className="nav-hamburger__icon" />
      </button>

      <Link href="/" className="nav-tablet__logo" aria-label={logo.alt}>
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          priority
        />
      </Link>

      <nav className="nav-tablet__links" aria-label="Primary">
        {navbar.slice(0, 3).map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            //  name={item.name}
          />
        ))}
      </nav>

      <div className="nav-tablet__actions">
        <button
          type="button"
          className="nav-icon-btn"
          onClick={toggleSearch}
          aria-label={actions.search.name}
        >
          <LucideLibrary
            name={actions.search.icon}
            className="nav-icon-btn__icon"
          />
        </button>
        <Link
          href={actions.account.href}
          className="nav-icon-btn"
          aria-label={actions.account.name}
        >
          <LucideLibrary
            name={actions.account.icon}
            className="nav-icon-btn__icon"
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

      <NavSidebar
        navKey={NAV_KEY}
        open={state.sidebarOpen}
        onClose={closeSidebar}
      />
    </div>
  );
};

export default NavbarTablet;
