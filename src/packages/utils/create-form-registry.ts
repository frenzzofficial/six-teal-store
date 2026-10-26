import type { z } from "zod";

/** The values a form of this registry submits, e.g. FormValues<typeof profileSchemaMap, "CHANGE_EMAIL">. */
export type FormValues<
  S extends Record<string, z.ZodType>,
  K extends keyof S,
> = z.infer<S[K]>;
