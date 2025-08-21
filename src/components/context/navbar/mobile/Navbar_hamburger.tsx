"use client";
import clsx from "clsx";
import React from "react";
import { useHamburgerMenu } from "@/components/providers/HamburgerProvider";

interface Navbar_hamburgerProps {
  menuKey: string;
}
const Navbar_hamburger = ({ menuKey }: Navbar_hamburgerProps) => {
  const { isOpen, toggleMenu } = useHamburgerMenu(menuKey);

  return (
    <button onClick={toggleMenu} className="hamburger-menu">
      {/* Top Line */}
      <span
        className={clsx(
          "block w-6 h-0.5 bg-primary rounded transition-transform duration-300",
          isOpen ? "rotate-45 translate-y-1.5" : "rotate-0 translate-y-0"
        )}
      ></span>

      {/* Middle Line */}
      <span
        className={clsx(
          "block w-6 h-0.5 bg-primary rounded transition-opacity duration-300",
          isOpen ? "opacity-0" : "opacity-100"
        )}
      ></span>

      {/* Bottom Line */}
      <span
        className={clsx(
          "block w-6 h-0.5 bg-primary rounded transition-transform duration-300",
          isOpen ? "-rotate-45 -translate-y-1.5" : "rotate-0 translate-y-0"
        )}
      ></span>
    </button>
  );
};

export default Navbar_hamburger;
