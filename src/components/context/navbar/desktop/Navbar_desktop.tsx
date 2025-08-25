import React from "react";
import Navbar_auth from "./Navbar_auth";
import Navbar_user from "./Navbar_user";
import Navbar_cart from "./Navbar_cart";
import Navbar_link from "../Navbar_link";
import Navbar_themes from "./Navbar_themes";
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
    <div className="flex items-center justify-between space-x-4 mr-5">
      {navbarlinks.map((link) => (
        <Navbar_link key={link.id} link={link} />
      ))}
      <div className="pr-3">
        <Navbar_themes />
      </div>
      {isAuthenticated ? <Navbar_user /> : <Navbar_auth />}
      <div className="pl-3">
        <Navbar_cart />
      </div>
    </div>
  );
};

export default Navbar_desktop;
