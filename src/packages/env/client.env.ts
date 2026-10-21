import { z } from "zod";
import { parseEnv } from "../utils/parse-env";

// Client Environment Schema
const parsedEnvSchema = z.object({
  NEXT_PUBLIC_CLIENT_ORIGIN: z.url().trim().default("http://localhost:7164"),

  NEXT_PUBLIC_CLIENT_PREFIX: z.string().trim().default("/app"),
});

// Literal `process.env.NEXT_PUBLIC_*` reads so Next.js can inline them for
// the browser bundle (see public.env.ts for why the whole object won't do).
const clientEnvSource = {
  NEXT_PUBLIC_CLIENT_ORIGIN: process.env.NEXT_PUBLIC_CLIENT_ORIGIN,
  NEXT_PUBLIC_CLIENT_PREFIX: process.env.NEXT_PUBLIC_CLIENT_PREFIX,
};

// Validated Client Environment
const parsedEnv = parseEnv(parsedEnvSchema, "client", clientEnvSource);

// Application Client Config
export const envClientConfig = Object.freeze({
  clientOrigin: parsedEnv.NEXT_PUBLIC_CLIENT_ORIGIN,
  clientPrefix: parsedEnv.NEXT_PUBLIC_CLIENT_PREFIX,
});

export type EnvClientConfig = typeof envClientConfig;
