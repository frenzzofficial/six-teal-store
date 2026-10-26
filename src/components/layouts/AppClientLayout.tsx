"use client";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import AuthProvider from "../providers/AuthProvider";
import NavigationProvider from "../providers/NavigationProvider";
import { StyleProvider } from "../providers/StyleProvider";
import ThemeProvider from "../providers/ThemeProvider";
import AnnouncementBar from "./AnnouncementBar";
import Footer from "./Footer";
import Header from "./Header";

interface AppClientLayoutProps {
  children: React.ReactNode;
}

/** The storefront frame: announcement bar, header, page, footer. */
const StorefrontFrame = ({ children }: AppClientLayoutProps) => (
  <>
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>
    <AnnouncementBar />
    <Suspense fallback={null}>
      <Header />
    </Suspense>
    <main id="main-content" className="main screen-height">
      {children}
    </main>
    <Footer />
  </>
);

/**
 * The dashboard brings its own shell (sidebar, no storefront header or footer), so the
 * storefront frame is skipped there. `usePathname` needs a Suspense boundary in a layout;
 * the fallback is the storefront frame, which keeps the static HTML of every other page
 * complete.
 */
const FrameSwitch = ({ children }: AppClientLayoutProps) => {
  const isDashboard = usePathname().startsWith("/dashboard");
  if (isDashboard) return <>{children}</>;
  return <StorefrontFrame>{children}</StorefrontFrame>;
};

const AppClientLayout = ({ children }: AppClientLayoutProps) => {
  return (
    <ThemeProvider>
      <StyleProvider>
        <AuthProvider>
          <NavigationProvider>
            <Suspense fallback={<StorefrontFrame>{children}</StorefrontFrame>}>
              <FrameSwitch>{children}</FrameSwitch>
            </Suspense>
          </NavigationProvider>
        </AuthProvider>
      </StyleProvider>
    </ThemeProvider>
  );
};

export default AppClientLayout;
