import { cva, type VariantProps } from "class-variance-authority";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { type AnchorHTMLAttributes, forwardRef, type ReactNode } from "react";

import { cn } from "@/packages/utils/cn";

const linkVariants = cva(
  [
    "group relative inline-flex items-center",
    "font-medium",
    "outline-none",
    "transition-all duration-300 ease-out",
    "focus-visible:ring-2",
    "focus-visible:ring-ring",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-offset-background",
    "[&_svg]:pointer-events-none",
    "[&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: [
          "text-primary",
          "underline",
          "decoration-primary/30",
          "underline-offset-4",

          // Underline animation
          "decoration-1",
          "transition-[text-decoration-color]",

          "after:absolute",
          "after:bottom-0",
          "after:left-1/2",
          "after:h-px",
          "after:w-full",
          "after:-translate-x-1/2",
          "after:origin-center",
          "after:scale-x-0",
          "after:bg-primary",
          "after:transition-transform",
          "after:duration-300",
          "after:ease-out",

          "hover:after:scale-x-100",
        ],

        secondary: [
          "rounded-full",
          "bg-transparent",
          "px-4",
          "py-2",
          "text-foreground",

          "hover:bg-primary",
          "hover:text-primary-foreground",
        ],

        button: [
          "h-11",
          "gap-2",
          "rounded-full",
          "px-5",
          "text-sm",
          "font-semibold",
          "text-primary-foreground",

          // SixTeal gradient
          "bg-linear-to-r",
          "from-primary",
          "via-primary",
          "to-primary/70",

          // Shadow
          "shadow-lg",
          "shadow-primary/20",

          // Hover movement
          "hover:-translate-y-0.5",
          "hover:shadow-xl",
          "hover:shadow-primary/30",

          // Shine animation
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

          // Press
          "active:scale-[0.97]",
        ],

        ghost: [
          "rounded-md",
          "text-foreground",

          "hover:bg-accent",
          "hover:text-accent-foreground",
        ],

        muted: ["text-muted-foreground", "hover:text-foreground"],

        // For nav items: `.nav-link`/`.nav-mobile__tab`/`.nav-sidebar__link`
        // (navigation.css) own color, hover, and the active-state underline
        // entirely. The "primary" variant's own `text-primary` + `underline`
        // + animated `after:` underline would double up on top of that
        // hand-written system — same pseudo-element, two owners, visibly
        // inconsistent underline behavior. This variant is a deliberate
        // blank slate for nav contexts.
        nav: ["text-inherit", "no-underline"],
      },

      size: {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base",
        xl: "text-lg",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps>,
    NextLinkProps,
    VariantProps<typeof linkVariants> {
  children?: ReactNode;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <NextLink
        ref={ref}
        className={cn(
          linkVariants({
            variant,
            size,
          }),
          className,
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </NextLink>
    );
  },
);

Link.displayName = "Link";

export { Link, linkVariants };
export type { LinkProps };
