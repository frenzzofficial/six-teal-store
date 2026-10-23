import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import "@/styles/features/components/category.css";
import { Icon, type IconName } from "@/components/ui";
import { categoryTheme } from "@/packages/configs/category-theme";
import { cn } from "@/packages/utils/cn";

import type { ImageProps } from "@/types/app";
import type { Category } from "@/types/product";

type CategoryTileProps = {
  category: Category;
  tagline?: string;
  size?: "sm" | "lg";
  /** A photo behind the glass. Without one the tile paints the category's theme colors. */
  image?: ImageProps;
  className?: string;
};

/**
 * A category card: a photo (or the category's color wash) with a frosted-glass panel floating
 * on top. The glass only looks like glass when there is something behind it to blur, so the
 * no-image variant draws its own soft color orbs from the theme.
 */
export function CategoryTile({
  category,
  tagline,
  size = "sm",
  image,
  className,
}: CategoryTileProps) {
  const theme = categoryTheme[category.slug];

  return (
    <Link
      href={`/products?category=${category.slug}`}
      className={cn(
        "category-tile group",
        `category-tile--${size}`,
        image ? "category-tile--has-image" : "category-tile--plain",
        className,
      )}
      style={
        {
          "--tile-bg": theme?.bg,
          "--tile-fg": theme?.fg,
        } as CSSProperties
      }
    >
      {image && (
        <div className="category-tile__image-wrapper">
          <Image
            src={image.src}
            alt=""
            width={Number(image.width) || 800}
            height={Number(image.height) || 600}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="category-tile__image"
          />
        </div>
      )}

      {/* Light vignette so white text on the glass stays readable over any photo. */}
      <span className="category-tile__scrim" aria-hidden="true" />

      <div className="category-tile__glass-panel">
        <span className="category-tile__icon-badge">
          <Icon
            name={category.icon as IconName}
            className="category-tile__icon"
          />
        </span>

        <span className="category-tile__details">
          <span className="category-tile__name">{category.name}</span>
          {tagline && <span className="category-tile__tagline">{tagline}</span>}
        </span>

        <span className="category-tile__cta" aria-hidden="true">
          <Icon name="arrow-right" className="category-tile__cta-icon" />
        </span>
      </div>
    </Link>
  );
}
