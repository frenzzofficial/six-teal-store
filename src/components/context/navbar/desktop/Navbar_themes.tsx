"use client";
import React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import Button_centerUnderline from "@/components/ui/buttons/Button_centerUnderline";

const Navbar_themes = () => {
  const { setTheme } = useTheme();

  return (
    <div className="group relative">
      <div className="flex items-center gap-1 w-3 font-medium text-[1rem] cursor-pointer">
        <Sun className="absolute  inset-0 m-auto h-4 w-4 rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute inset-0 m-auto h-4 w-4 rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100" />
      </div>
      <div className="absolute top-2 w-fit min-w-20 -left-5 mt-2 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <ul className="flex flex-col gap-2 py-2 px-4 rounded-md">
          <Button_centerUnderline
            onClick={() => setTheme("dark")}
            label="Dark"
            isActive={false}
          />
          <Button_centerUnderline
            onClick={() => setTheme("Light")}
            label="Light"
            isActive={false}
          />
          <Button_centerUnderline
            onClick={() => setTheme("System")}
            label="System"
            isActive={false}
          />
        </ul>
      </div>
    </div>
  );
};

export default Navbar_themes;
