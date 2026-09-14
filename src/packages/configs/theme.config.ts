/**
 * theme.config.ts
 * --------------------------------------------------------------
 * Single source of truth for next-themes' setup (see ThemeProvider.tsx).
 *
 * Forced to light: the design only has a light/teal palette — there is no
 * `.dark` override block in sixteal-theme.css — so letting next-themes
 * follow the OS/system preference would silently apply a `dark` class
 * that nothing in the CSS accounts for. `forcedTheme` pins the theme and
 * disables the switching machinery entirely, rather than leaving that to
 * chance.
 */
export const themeConfig = {
  attribute: "class",
  defaultTheme: "light",
  forcedTheme: "light",
  enableSystem: false,
  disableTransitionOnChange: true,
} as const;
