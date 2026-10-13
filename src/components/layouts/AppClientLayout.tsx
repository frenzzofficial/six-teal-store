"use client";
import { Suspense } from "react";
import NavigationProvider from "../providers/NavigationProvider";
import { StyleProvider } from "../providers/StyleProvider";
import ThemeProvider from "../providers/ThemeProvider";
import Footer from "./Footer";
import Header from "./Header";

interface AppClientLayoutProps {
  children: React.ReactNode;
}
const AppClientLayout = ({ children }: AppClientLayoutProps) => {
  return (
    <ThemeProvider>
      <StyleProvider>
        <NavigationProvider>
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          <main className="main screen-height">{children}</main>
          <Footer />
        </NavigationProvider>
      </StyleProvider>
    </ThemeProvider>
  );
};

export default AppClientLayout;
