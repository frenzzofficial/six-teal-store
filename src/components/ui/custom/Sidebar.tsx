"use client";

import clsx from "clsx";
import React from "react";
import { useHamburgerMenu } from "@/components/providers/HamburgerProvider";

interface SidebarProps {
  menuKey: string;
  dir?: "left" | "right";
  children: React.ReactNode;
}
const Sidebar = ({ menuKey, dir = "right", children }: SidebarProps) => {
  const { isOpen, closeMenu } = useHamburgerMenu(menuKey);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeMenu}
        className={clsx(
          "fixed left-0 right-0 bottom-0 bg-black/30 backdrop-blur-md z-[998] transition-opacity duration-300",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible",
          isOpen && "top-[45px]"
        )}
      />
      {/* Sidebar opem menu */}
      <div
        className={clsx(
          "fixed w-1/2 h-screen bg-white z-[999] transition-transform duration-300 py-6 px-4 overflow-y-auto",
          dir === "left" ? "left-0" : "right-0",
          isOpen && "top-[45px]",
          isOpen
            ? "translate-x-0"
            : dir === "left"
              ? "-translate-x-full"
              : "translate-x-full"
        )}
      >
        {/* Sidebar Content */}
        {children}
      </div>
    </>
  );
};

export default Sidebar;
