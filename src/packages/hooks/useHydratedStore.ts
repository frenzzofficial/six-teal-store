"use client";

import type { StoreApi, UseBoundStore } from "zustand";
import { useMounted } from "./useMounted";

/**
 * useHydratedStore.ts
 * --------------------------------------------------------------
 * Reads from a persisted (localStorage/sessionStorage) Zustand store in a
 * way that is safe to server-render.
 *
 * The server has no access to browser storage, so it always renders the
 * store's initial state. A returning shopper's first client render would
 * instead see their saved cart/wishlist and disagree with the HTML the
 * server sent, which React reports as a hydration error and answers by
 * throwing the whole tree away and re-rendering it.
 *
 * Until the component has mounted this returns `fallback` (identical on
 * server and client), then switches to the real value. Pass a stable
 * `fallback` (a module-level constant, not a fresh `[]`) so the snapshot
 * doesn't change identity between renders.
 */
export function useHydratedStore<S, T>(
  // Named `useStore` on purpose: the React Compiler only treats a call as a
  // hook when the callee is named `use*`. Called as `store(...)` it was
  // memoized away on some renders, which changed the hook order and threw
  // "Should have a queue".
  useStore: UseBoundStore<StoreApi<S>>,
  selector: (state: S) => T,
  fallback: T,
): T {
  const value = useStore(selector);
  const mounted = useMounted();
  return mounted ? value : fallback;
}
