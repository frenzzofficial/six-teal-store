"use client";

import { useCallback, useEffect, useState } from "react";
import { getAuthErrorMessage } from "@/packages/utils/auth-error";

export type LoadState<T> =
  | { status: "loading" }
  | { status: "ready"; data: T }
  | { status: "error"; message: string };

/**
 * Loads something once when the component mounts, and again on `reload()`.
 *
 * `loader` and `errorMessage` must be stable (a module-level function and a string literal),
 * otherwise every render would start a new request. A reload keeps showing the current data
 * until the new data arrives; only a reload out of an error goes back to "loading".
 */
export const useLoad = <T>(loader: () => Promise<T>, errorMessage: string) => {
  const [state, setState] = useState<LoadState<T>>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: `attempt` only re-triggers the load
  useEffect(() => {
    let cancelled = false;

    loader()
      .then((data) => {
        if (!cancelled) setState({ status: "ready", data });
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            status: "error",
            message: getAuthErrorMessage(error, errorMessage),
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [loader, errorMessage, attempt]);

  const reload = useCallback(() => {
    setState((current) =>
      current.status === "error" ? { status: "loading" } : current,
    );
    setAttempt((n) => n + 1);
  }, []);

  return { state, reload };
};
