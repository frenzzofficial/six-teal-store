"use client";
import { NavigationProvider } from "../providers/NavigationProvider";
import Footer from "./Footer";
import Header from "./Header";

interface AppClientLayoutProps {
  children: React.ReactNode;
}

const AppClientLayout = (props: AppClientLayoutProps) => {
  const { children } = props;
  return (
    <NavigationProvider>
      <Header />
      <main className="min-h-screen w-full">{children}</main>
      <Footer />
    </NavigationProvider>
  );
};

export default AppClientLayout;
