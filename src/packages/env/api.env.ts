import { z } from "zod";
import { parseEnv } from "../utils/parse-env";

/**
 * API mode switch
 * --------------------------------------------------------------
 * "internal" (recommended): the browser calls this app's own `/api/*`, and
 * next.config.ts rewrites it to the auth backend (API_PROXY_TARGET), so the
 * session and CSRF cookies are first-party.
 *
 * "external": the browser calls NEXT_PUBLIC_API_URL (must end in /api) directly.
 * That needs CORS with credentials and `SameSite=None; Secure` cookies, and breaks
 * in browsers that block third-party cookies.
 *
 * `NEXT_PUBLIC_*` values are only inlined into the browser bundle when they are
 * written as literal `process.env.NEXT_PUBLIC_X`, hence the explicit source object.
 */
const apiEnvSchema = z
  .object({
    NEXT_PUBLIC_API_MODE: z.enum(["internal", "external"]).default("internal"),
    NEXT_PUBLIC_API_URL: z.string().trim().optional(),
    NEXT_PUBLIC_API_TIMEOUT_MS: z.coerce
      .number()
      .int()
      .positive()
      .default(15000),
  })
  .superRefine((val, ctx) => {
    if (val.NEXT_PUBLIC_API_MODE === "external" && !val.NEXT_PUBLIC_API_URL) {
      ctx.addIssue({
        code: "custom",
        path: ["NEXT_PUBLIC_API_URL"],
        message:
          'NEXT_PUBLIC_API_URL is required when NEXT_PUBLIC_API_MODE="external"',
      });
    }
  });

const parsed = parseEnv(apiEnvSchema, "API", {
  NEXT_PUBLIC_API_MODE: process.env.NEXT_PUBLIC_API_MODE,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_API_TIMEOUT_MS: process.env.NEXT_PUBLIC_API_TIMEOUT_MS,
});

const isExternal = parsed.NEXT_PUBLIC_API_MODE === "external";

export const apiEnvConfig = Object.freeze({
  API_MODE: parsed.NEXT_PUBLIC_API_MODE,
  // Internal mode is a relative path: same origin, so it works on any domain unchanged.
  API_URL: isExternal ? (parsed.NEXT_PUBLIC_API_URL ?? "") : "/api",
  API_TIMEOUT_MS: parsed.NEXT_PUBLIC_API_TIMEOUT_MS,
  IS_EXTERNAL: isExternal,
  // Where full-page navigations (provider sign-in) must go: "" means this same origin.
  API_ORIGIN:
    isExternal && parsed.NEXT_PUBLIC_API_URL
      ? new URL(parsed.NEXT_PUBLIC_API_URL).origin
      : "",
});
