const THEME_STORAGE_KEY = "sixtealstore-theme";

export const themeConfig = {
  attribute: "class",
  storageKey: THEME_STORAGE_KEY,
  defaultTheme: "light",
  forcedTheme: "light",
  enableSystem: false,
  disableTransitionOnChange: true,
} as const;
