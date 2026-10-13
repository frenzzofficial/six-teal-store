import Link from "next/link";
import type { CSSProperties } from "react";
import { Icon, type IconName } from "@/components/ui";
import { categoryTheme } from "@/packages/configs/category-theme";
import { cn } from "@/packages/utils/cn";
import type { Category } from "@/types/product";

type CategoryTileProps = {
  category: Category;
  tagline?: string;
  size?: "sm" | "lg";
  className?: string;
};

export function CategoryTile({
  category,
  tagline,
  size = "sm",
  className,
}: CategoryTileProps) {
  const theme = categoryTheme[category.slug];

  return (
    <Link
      href={`/products?category=${category.slug}`}
      className={cn("category-tile", `category-tile--${size}`, className)}
      style={
        {
          "--tile-bg": theme.bg,
          "--tile-fg": theme.fg,
        } as CSSProperties
      }
    >
      <Icon name={category.icon as IconName} className="category-tile__icon" />
      <span className="category-tile__name">{category.name}</span>
      {tagline && <span className="category-tile__tagline">{tagline}</span>}
    </Link>
  );
}
