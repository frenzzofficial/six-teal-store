import { z } from "zod";
import { STYLES_THEME_NAMES } from "../configs/styles.config";
import { parseEnv } from "../utils/parse-env";

// Public Environment Schema
const parsedEnvSchema = z.object({
  // App
  NEXT_PUBLIC_APP_NAME: z.string().trim().min(1).default("Six Teal Store"),

  NEXT_PUBLIC_APP_VERSION: z.string().trim().min(1).default("2.0.1"),

  NEXT_PUBLIC_APP_DESCRIPTION: z
    .string()
    .trim()
    .min(1)
    .default(
      "Six Teal Store is a modern e-commerce platform that offers a wide range of products and services to customers worldwide. Our mission is to provide a seamless shopping experience with high-quality products, competitive prices, and exceptional customer service.",
    ),

  // Site
  NEXT_PUBLIC_SITE_URL: z.url().default("http://localhost:3000"),

  NEXT_PUBLIC_SITE_TITLE: z
    .string()
    .trim()
    .min(1)
    .default("Six Teal Store - Your Premium Luxury Destination"),

  NEXT_PUBLIC_LOGO_URL: z.string().trim().min(1).default("/logo.png"),

  NEXT_PUBLIC_OG_IMAGE_URL: z.string().trim().optional(),

  // Theme
  NEXT_PUBLIC_ACTIVE_STYLE: z.enum(STYLES_THEME_NAMES).default("sixteal-theme"),

  NEXT_PUBLIC_ACTIVE_THEME: z
    .enum(["system", "light", "dark"])
    .default("light"),

  // Social
  NEXT_PUBLIC_INSTAGRAM: z
    .string()
    .trim()
    .default("https://instagram.com/sixtealstore"),

  NEXT_PUBLIC_TWITTER: z
    .string()
    .trim()
    .default("https://twitter.com/sixtealstore"),

  NEXT_PUBLIC_LINKEDIN: z
    .string()
    .trim()
    .default("https://www.linkedin.com/company/sixtealstore/"),

  // Author
  NEXT_PUBLIC_AUTHOR_NAME: z.string().trim().default("@sixtealstore"),

  NEXT_PUBLIC_AUTHOR_EMAIL: z.string().trim().default("contact@sixteal.store"),

  NEXT_PUBLIC_AUTHOR_HANDLE: z.string().trim().min(1).default("@sixtealstore"),

  // Google Verification
  NEXT_PUBLIC_GOOGLE_VERIFICATION: z
    .string()
    .trim()
    .min(1)
    .default("google-verification-code"),
});

/**
 * Every NEXT_PUBLIC_* variable must be referenced as a literal
 * `process.env.NEXT_PUBLIC_X` for Next.js to inline it into the browser
 * bundle. Passing the whole `process.env` object works on the server but
 * is empty in the browser, so the client silently fell back to the schema
 * defaults and disagreed with the server-rendered HTML (hydration error).
 */
const publicEnvSource = {
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
  NEXT_PUBLIC_APP_DESCRIPTION: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SITE_TITLE: process.env.NEXT_PUBLIC_SITE_TITLE,
  NEXT_PUBLIC_LOGO_URL: process.env.NEXT_PUBLIC_LOGO_URL,
  NEXT_PUBLIC_OG_IMAGE_URL: process.env.NEXT_PUBLIC_OG_IMAGE_URL,
  NEXT_PUBLIC_ACTIVE_STYLE: process.env.NEXT_PUBLIC_ACTIVE_STYLE,
  NEXT_PUBLIC_ACTIVE_THEME: process.env.NEXT_PUBLIC_ACTIVE_THEME,
  NEXT_PUBLIC_INSTAGRAM: process.env.NEXT_PUBLIC_INSTAGRAM,
  NEXT_PUBLIC_TWITTER: process.env.NEXT_PUBLIC_TWITTER,
  NEXT_PUBLIC_LINKEDIN: process.env.NEXT_PUBLIC_LINKEDIN,
  NEXT_PUBLIC_AUTHOR_NAME: process.env.NEXT_PUBLIC_AUTHOR_NAME,
  NEXT_PUBLIC_AUTHOR_EMAIL: process.env.NEXT_PUBLIC_AUTHOR_EMAIL,
  NEXT_PUBLIC_AUTHOR_HANDLE: process.env.NEXT_PUBLIC_AUTHOR_HANDLE,
  NEXT_PUBLIC_GOOGLE_VERIFICATION: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
};

// Validated Public Environment
const parsedEnv = parseEnv(parsedEnvSchema, "public", publicEnvSource);

// Public Application Config
export const envPublicConfig = Object.freeze({
  // App
  APP_NAME: parsedEnv.NEXT_PUBLIC_APP_NAME,
  APP_VERSION: parsedEnv.NEXT_PUBLIC_APP_VERSION,
  APP_DESCRIPTION: parsedEnv.NEXT_PUBLIC_APP_DESCRIPTION,

  // Site
  SITE_URL: parsedEnv.NEXT_PUBLIC_SITE_URL,
  SITE_TITLE: parsedEnv.NEXT_PUBLIC_SITE_TITLE,
  LOGO_URL: parsedEnv.NEXT_PUBLIC_LOGO_URL,
  OG_IMAGE_URL: parsedEnv.NEXT_PUBLIC_OG_IMAGE_URL,

  // Theme
  ACTIVE_STYLE: parsedEnv.NEXT_PUBLIC_ACTIVE_STYLE,
  ACTIVE_THEME: parsedEnv.NEXT_PUBLIC_ACTIVE_THEME,

  // Social
  TWITTER: parsedEnv.NEXT_PUBLIC_TWITTER,
  LINKEDIN: parsedEnv.NEXT_PUBLIC_LINKEDIN,
  INSTAGRAM: parsedEnv.NEXT_PUBLIC_INSTAGRAM,

  // Author
  AUTHOR_NAME: parsedEnv.NEXT_PUBLIC_AUTHOR_NAME,
  AUTHOR_HANDLE: parsedEnv.NEXT_PUBLIC_AUTHOR_HANDLE,
  AUTHOR_EMAIL: parsedEnv.NEXT_PUBLIC_AUTHOR_EMAIL,

  // Google Verification
  GOOGLE_VERIFICATION: parsedEnv.NEXT_PUBLIC_GOOGLE_VERIFICATION,
});
