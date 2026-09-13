import { Cousine, Merriweather, Noto_Sans_Cuneiform } from "next/font/google";

export const fontSans = Noto_Sans_Cuneiform({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400"],
});

export const fontSerif = Merriweather({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const fontMono = Cousine({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
});
