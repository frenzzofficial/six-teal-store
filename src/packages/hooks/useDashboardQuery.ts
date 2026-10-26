"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface DashboardQueryState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  /** Runs the fetcher again, e.g. after an edit. The old data stays on screen meanwhile. */
  refetch: () => void;
}

/**
 * Loads dashboard data through a services function. `key` must change whenever the request
 * should run again (pass the serialized filters, e.g. `JSON.stringify(query)`); the fetcher
 * itself is read through a ref, so an inline arrow function is fine.
 */
export const useDashboardQuery = <T>(
  fetcher: () => Promise<T>,
  key: string,
): DashboardQueryState<T> => {
  const fetcherRef = useRef(fetcher);
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    fetcherRef.current = fetcher;
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: `key` and `version` are the triggers on purpose; the fetcher is read through a ref.
  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    fetcherRef
      .current()
      .then((result) => {
        if (cancelled) return;
        setData(result);
        setError(null);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Something went wrong.");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [key, version]);

  const refetch = useCallback(() => setVersion((v) => v + 1), []);

  return { data, isLoading, error, refetch };
};
