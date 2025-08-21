import React from "react";
import { HeaderConfig } from "@/types/app";
import Sidebar from "../ui/custom/Sidebar";
import Navbar_logo from "../context/navbar/Navbar_logo";
import Navbar_mobile from "../context/navbar/mobile/Navbar_mobile";
import Navbar_desktop from "../context/navbar/desktop/Navbar_desktop";
import Navbar_hamburger from "../context/navbar/mobile/Navbar_hamburger";

interface HeaderProps {
  isMobile?: boolean;
  isTablet?: boolean;
  isDesktop?: boolean;
  isAuthenticated?: boolean;
  headerConfig: HeaderConfig;
  refObject: React.RefObject<HTMLHeadElement | null>;
}

const Header = ({
  isMobile,
  isTablet,
  refObject,
  headerConfig,
  isAuthenticated,
}: HeaderProps) => {
  const HeaderConfig: HeaderConfig = {
    logo: "SixTeal",
    navLinks: headerConfig.navLinks,
  };

  const isResponsive = isMobile || isTablet;

  return (
    <>
      <header className="header__main" ref={refObject}>
        {
          //logo
          //logo
          //logo
          <Navbar_logo
            image=""
            label={
              typeof HeaderConfig.logo === "string" ? HeaderConfig.logo : ""
            }
          />
        }

        {isResponsive ? (
          // hamburger icon
          // hamburger icon
          // hamburger icon
          <Navbar_hamburger menuKey="hamburger-menu" />
        ) : (
          // Desktop only version
          // Desktop only version
          // Desktop only version
          <Navbar_desktop
            navbarlinks={HeaderConfig.navLinks}
            isAuthenticated={isAuthenticated || false}
          />
        )}
      </header>
      {
        // mobile or tablet version sidebar
        // mobile or tablet version sidebar
        // mobile or tablet version sidebar
        isResponsive ? (
          <Sidebar menuKey="hamburger-menu">
            <Navbar_mobile
              navbarlinks={HeaderConfig.navLinks}
              isAuthenticated={isAuthenticated || false}
            />
          </Sidebar>
        ) : null
      }
    </>
  );
};

export default Header;
