import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";

import { cn } from "@/packages/utils/cn";

const buttonVariants = cva(
  [
    "group relative inline-flex items-center justify-center",
    "shrink-0 overflow-hidden whitespace-nowrap",
    "rounded-full",
    "font-semibold",
    "select-none",
    "transition-all duration-300 ease-out",
    "outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-ring",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-offset-background",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "disabled:shadow-none",
    "active:scale-[0.97]",
    "[&_svg]:pointer-events-none",
    "[&_svg]:shrink-0",
    "cursor-pointer",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-linear-to-r",
          "from-primary",
          "via-primary",
          "to-primary/70",
          "text-primary-foreground",
          "shadow-lg",
          "shadow-primary/20",

          // Hover
          "hover:-translate-y-0.5",
          "hover:shadow-xl",
          "hover:shadow-primary/30",

          // Animated shine
          "before:absolute",
          "before:inset-0",
          "before:-translate-x-full",
          "before:bg-linear-to-r",
          "before:from-transparent",
          "before:via-white/25",
          "before:to-transparent",
          "before:transition-transform",
          "before:duration-700",
          "hover:before:translate-x-full",
        ],

        secondary: [
          "bg-primary",
          "text-primary-foreground",
          "shadow-sm",
          "shadow-primary/15",

          "hover:bg-primary/90",
          "hover:-translate-y-0.5",
          "hover:shadow-md",
          "hover:shadow-primary/20",
        ],

        outline: [
          "border",
          "border-primary/30",
          "bg-background",
          "text-primary",

          "hover:border-primary",
          "hover:bg-primary",
          "hover:text-primary-foreground",
          "hover:-translate-y-0.5",
        ],

        ghost: [
          "bg-transparent",
          "text-foreground",

          "hover:bg-accent",
          "hover:text-accent-foreground",
        ],

        destructive: [
          "bg-destructive",
          "text-destructive-foreground",
          "shadow-sm",
          "shadow-destructive/15",

          "hover:bg-destructive/90",
          "hover:-translate-y-0.5",
          "hover:shadow-md",
        ],

        success: [
          "bg-success",
          "text-success-foreground",
          "shadow-sm",
          "shadow-success/15",

          "hover:bg-success/90",
          "hover:-translate-y-0.5",
          "hover:shadow-md",
        ],

        link: [
          "h-auto",
          "rounded-none",
          "bg-transparent",
          "p-0",
          "text-primary",
          "underline-offset-4",

          "hover:underline",

          "active:scale-100",
        ],
      },

      size: {
        sm: ["h-9", "gap-1.5", "px-4", "text-xs"],

        default: ["h-11", "gap-2", "px-5", "text-sm"],

        lg: ["h-12", "gap-2", "px-7", "text-base"],

        xl: ["h-14", "gap-2.5", "px-8", "text-base"],

        icon: ["size-10"],
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

const Spinner = () => {
  return (
    <span
      aria-hidden="true"
      className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
    />
  );
};

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        aria-busy={loading}
        className={cn(
          buttonVariants({
            variant,
            size,
          }),
          className,
        )}
        {...props}
      >
        {loading ? (
          <>
            <Spinner />
            {loadingText ?? children}
          </>
        ) : (
          <>
            {leftIcon}
            <span className="relative z-10">{children}</span>
            {rightIcon}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
