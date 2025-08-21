import React from "react";
import { ExtendedNavLink } from "@/types/app";
import Navbar_link from "../Navbar_link";

interface Navbar_mobileProps {
  isAuthenticated: boolean;
  navbarlinks: Array<ExtendedNavLink>;
}

const Navbar_mobile: React.FC<Navbar_mobileProps> = ({
  navbarlinks,
  isAuthenticated,
}) => {
  return (
    <>
      <ul className="navbar__mobile-menulist">
        {navbarlinks.map((link) => {
          return <Navbar_link key={link.id} link={link} />;
        })}
        {isAuthenticated && <div></div>}
      </ul>
    </>
  );
};

export default Navbar_mobile;
