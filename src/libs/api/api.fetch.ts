"server only";

import { RootLayoutData } from "@/types/app";
import { envAppConfig } from "../env/env.app";
import { envRootLayoutConfig } from "../env/env.layout";

/**
 * Generic API fetcher with optional revalidation.
 * @param endpoint - Full API endpoint URL
 * @param revalidateInSeconds - Optional revalidation time in seconds
 * @returns Parsed JSON response
 */
export const fetchFromAPI = async <T = unknown>(
  endpoint: string,
  revalidateInSeconds?: number
): Promise<T | null> => {
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      credentials: "same-origin",
      next:
        envAppConfig.APP_ENV === "production"
          ? { revalidate: revalidateInSeconds ?? 86400 } // Default: 1 day
          : undefined,
    });

    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
};

/**
 * Retrieves root layout configuration from the layout API.
 * Used in src/app/layout.tsx
 * @returns RootLayoutData object or null
 */
export const getRootLayoutData = async (): Promise<RootLayoutData | null> => {
  const result = await fetchFromAPI<{ layout: RootLayoutData }>(
    envRootLayoutConfig.ROOT_LAYOUT_API
  );
  return result?.layout ?? null;
};
