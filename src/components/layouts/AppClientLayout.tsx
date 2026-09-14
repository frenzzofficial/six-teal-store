"use client";
import { NavigationProvider } from "../providers/NavigationProvider";
import { ThemeProvider } from "../providers/ThemeProvider";
import { Toaster } from "../ui/shadcn/toast";
import { TooltipProvider } from "../ui/shadcn/tooltip";
import Footer from "./Footer";
import Header from "./Header";

interface AppClientLayoutProps {
  children: React.ReactNode;
}

const AppClientLayout = (props: AppClientLayoutProps) => {
  const { children } = props;
  return (
    <ThemeProvider>
      <TooltipProvider>
        <NavigationProvider>
          <Header />
          <main className="min-h-screen w-full">{children}</main>
          <Footer />
          <Toaster />
        </NavigationProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default AppClientLayout;
