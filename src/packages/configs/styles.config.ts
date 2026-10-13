import fontsConfig from "./fonts.config";

/**
 * Shape returned by every next/font loader (Geist, Oxanium, Inika, ...).
 * We only care about the pieces we actually consume.
 */
type FontLoader = {
  variable: string;
  className: string;
};

export type StyleTheme = {
  /**
   * MUST exactly match:
   *  - the file name in `styles/themes/<name>.css`
   *  - the `[data-theme="<name>"]` selector used inside that file
   */
  name: string;
  label: string;
  type: "custom-theme" | "color-theme";
  description: string;
  fonts: readonly FontLoader[];
  /** Where the theme file lives, kept for reference/tooling only. */
  src: string;
};

// REGISTER YOUR OWN THEMES HERE
export const STYLE_THEMES = [
  {
    name: "sixteal-theme",
    label: "Sixteal Theme",
    type: "custom-theme",
    description: "A Teal light theme",
    fonts: [fontsConfig.sans, fontsConfig.serif, fontsConfig.mono],
    src: "@/styles/themes/custom-themes/sixteal-theme.css",
  },
  {
    name: "violet-theme",
    label: "Violet",
    type: "color-theme",
    description: "A soft violet theme",
    fonts: [fontsConfig.sans, fontsConfig.serif, fontsConfig.mono],
    src: "@/styles/themes/colors-themes/violet-theme.css",
  },
] as const satisfies readonly StyleTheme[];

export const STYLES_THEME_NAMES = STYLE_THEMES.map((theme) => theme.name);
export type StyleThemeName = (typeof STYLE_THEMES)[number]["name"];

/**
 * Fonts mounted on <html> regardless of which theme is active — for
 * personal/brand usage (e.g. `className="font-brilliant"` on a hero name),
 * not tied to any theme's --font-sans/--font-serif/--font-mono slots.
 */
export const BRAND_FONTS: readonly FontLoader[] = [fontsConfig.custom];

export const getStyleTheme = (name: StyleThemeName): StyleTheme => {
  const theme = STYLE_THEMES.find((theme) => theme.name === name);

  if (!theme) {
    throw new Error(
      `Unknown theme "${name}". Register it in packages/configs/styles.config.ts first.`,
    );
  }

  return theme;
};
