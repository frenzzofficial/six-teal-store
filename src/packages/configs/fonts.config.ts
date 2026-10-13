import { Inter, JetBrains_Mono, Merriweather } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "700"],
});

export const jetBrains_Mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
});

// custom fonts
// src: "../../assets/fonts/georgia.ttf",
const CustomFont = localFont({
  src: "../../assets/fonts/custom.ttf",
  variable: "--font-custom",
  weight: "400",
  style: "normal",
  display: "swap",
});

export default {
  sans: inter,
  serif: merriweather,
  mono: jetBrains_Mono,
  custom: CustomFont,
};
