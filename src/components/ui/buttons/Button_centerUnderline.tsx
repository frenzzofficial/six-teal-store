import React from "react";
import { Button } from "../shadcn/button";

interface Button_centerUnderlineProps {
  isActive: boolean;
  label?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}
const Button_centerUnderline = ({
  isActive,
  label,
  onClick,
  children,
}: Button_centerUnderlineProps) => {
  return (
    <Button
      variant={"empty"}
      className={`group/button relative w-fit font-medium text-[1rem] transition-colors duration-200 p-0 ${
        isActive ? "text-secondary" : "text-muted"
      }`}
      onClick={() => {
        onClick?.();
      }}
    >
      {label ? label : children}
      <span className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-muted transition-all duration-300 group-hover/button:w-full group-hover/button:left-0"></span>
    </Button>
  );
};

export default Button_centerUnderline;
