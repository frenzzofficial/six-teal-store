import React from "react";
import Navbar_link from "../Navbar_link";
import { ExtendedNavLink } from "@/types/app";

interface Navbar_desktopProps {
  isAuthenticated: boolean;
  navbarlinks: Array<ExtendedNavLink>;
}

const Navbar_desktop = ({
  navbarlinks,
  isAuthenticated,
}: Navbar_desktopProps) => {
  return (
    <div className="flex items-center justify-between space-x-4">
      {navbarlinks.map((link) => (
        <Navbar_link key={link.id} link={link} />
      ))}
      {isAuthenticated ? <div></div> : null}
    </div>
  );
};

export default Navbar_desktop;
