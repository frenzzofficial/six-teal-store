import { Inter, JetBrains_Mono, Merriweather } from "next/font/google";

// NOTE: fontSans was previously set to Noto_Sans_Cuneiform (literal ancient
// cuneiform glyphs) — every element using font-sans (i.e. the whole body,
// see globals.css) rendered as cuneiform symbols instead of readable text.
// Inter is the clean, modern sans in the Figma designs.
export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const fontSerif = Merriweather({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
});
