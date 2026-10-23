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
  image?: ImageProps;
  className?: string;
};

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
        "category-tile",
        `category-tile--${size}`,
        image && "category-tile--image",
        className,
      )}
      style={
        {
          "--tile-bg": theme.bg,
          "--tile-fg": theme.fg,
        } as CSSProperties
      }
    >
      {/* Background image */}
      {image && (
        <Image
          src={image.src}
          alt={image.alt}
          width={Number(image.width)}
          height={Number(image.height)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="category-tile__image"
        />
      )}

      {/* Overlay keeps text readable */}
      {image && <span className="category-tile__overlay" aria-hidden="true" />}

      {/* Content */}
      <span className="category-tile__content">
        <Icon
          name={category.icon as IconName}
          className="category-tile__icon"
        />

        <span className="category-tile__name">{category.name}</span>

        {tagline && <span className="category-tile__tagline">{tagline}</span>}
      </span>
    </Link>
  );
}
