"use client";
import { NavigationProvider } from "../providers/NavigationProvider";
import { ThemeProvider } from "../providers/ThemeProvider";
import Footer from "./Footer";
import Header from "./Header";

interface AppClientLayoutProps {
  children: React.ReactNode;
}

const AppClientLayout = (props: AppClientLayoutProps) => {
  const { children } = props;
  return (
    <ThemeProvider>
      <NavigationProvider>
        <Header />
        <main className="min-h-screen w-full">{children}</main>
        <Footer />
      </NavigationProvider>
    </ThemeProvider>
  );
};

export default AppClientLayout;
