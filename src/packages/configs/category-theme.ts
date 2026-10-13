import type { CategorySlug } from "@/types/product";

/**
 * category-theme.ts
 * --------------------------------------------------------------
 * The pastel/dark tile colors behind each category in the hero grid and
 * "Explore by Category" section (figma/homepage.png). One place to tune
 * a category's color — CategoryTile just reads from here.
 */
export const categoryTheme: Record<CategorySlug, { bg: string; fg: string }> = {
  fashion: { bg: "#bdeee0", fg: "#0f3d2e" },
  tech: { bg: "#0f2a28", fg: "#eafff9" },
  literature: { bg: "#f5e3b3", fg: "#4a3a12" },
  fragrance: { bg: "#f6d2d9", fg: "#5c1f2e" },
  accessories: { bg: "#e4e2f5", fg: "#2c2a4a" },
  wellness: { bg: "#ffe1d6", fg: "#6b2e1a" },
};
