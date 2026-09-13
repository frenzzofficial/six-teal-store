import { z } from "zod";

const publicEnvSchema = z.object({
  // App
  NEXT_PUBLIC_APP_NAME: z.string().trim().min(1).default("Six Teal Store"),

  NEXT_PUBLIC_APP_VERSION: z.string().trim().default("2.0.0"),

  NEXT_PUBLIC_APP_DESCRIPTION: z
    .string()
    .trim()
    .min(1)
    .default(
      "Six Teal Store is a modern e-commerce platform that offers a wide range of products and services to customers worldwide. Our mission is to provide a seamless shopping experience with high-quality products, competitive prices, and exceptional customer service.",
    ),

  // Site
  NEXT_PUBLIC_SITE_URL: z.url().trim().default("http://localhost:3000"),

  NEXT_PUBLIC_SITE_TITLE: z
    .string()
    .trim()
    .min(1)
    .default("Six Teal Store - Your Premium Luxury Destination"),

  NEXT_PUBLIC_LOGO_URL: z.string().trim().default("/logo.png"),

  NEXT_PUBLIC_OG_IMAGE_URL: z.string().trim().optional(),

  // Theme

  NEXT_PUBLIC_ACTIVE_THEME: z
    .enum(["system", "light", "dark"])
    .default("system"),

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

  NEXT_PUBLIC_AUTHOR_NAME: z.string().trim().default("@sixtealstore"),

  NEXT_PUBLIC_AUTHOR_EMAIL: z.string().trim().default("contact@sixteal.store"),
});

const parsedPublicEnv = publicEnvSchema.safeParse(process.env);

if (!parsedPublicEnv.success) {
  console.error("❌ Invalid public environment variables:");

  for (const issue of parsedPublicEnv.error.issues) {
    console.error(`- ${issue.path.join(".")}: ${issue.message}`);
  }

  throw new Error("Public environment validation failed");
}

export const envPublicConfig = Object.freeze({
  APP_NAME: parsedPublicEnv.data.NEXT_PUBLIC_APP_NAME,
  APP_VERSION: parsedPublicEnv.data.NEXT_PUBLIC_APP_VERSION,
  APP_DESCRIPTION: parsedPublicEnv.data.NEXT_PUBLIC_APP_DESCRIPTION,

  SITE_URL: parsedPublicEnv.data.NEXT_PUBLIC_SITE_URL,
  SITE_TITLE: parsedPublicEnv.data.NEXT_PUBLIC_SITE_TITLE,

  LOGO_URL: parsedPublicEnv.data.NEXT_PUBLIC_LOGO_URL,
  OG_IMAGE_URL: parsedPublicEnv.data.NEXT_PUBLIC_OG_IMAGE_URL,

  ACTIVE_THEME: parsedPublicEnv.data.NEXT_PUBLIC_ACTIVE_THEME,

  INSTAGRAM: parsedPublicEnv.data.NEXT_PUBLIC_INSTAGRAM,
  TWITTER: parsedPublicEnv.data.NEXT_PUBLIC_TWITTER,
  LINKEDIN: parsedPublicEnv.data.NEXT_PUBLIC_LINKEDIN,

  AUTHOR_NAME: parsedPublicEnv.data.NEXT_PUBLIC_AUTHOR_NAME,
  AUTHOR_EMAIL: parsedPublicEnv.data.NEXT_PUBLIC_AUTHOR_EMAIL,
});

export type EnvPublicConfig = typeof envPublicConfig;
