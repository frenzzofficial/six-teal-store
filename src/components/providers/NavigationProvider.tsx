"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";

/**
 * Navigation state is keyed so multiple independent nav surfaces
 * (e.g. "main", "checkout", "account") can each carry their own
 * open/active state without stepping on each other, all from one
 * provider mounted once at the root layout.
 *
 * Usage:
 *   // app/layout.tsx
 *   <NavigationProvider>{children}</NavigationProvider>
 *
 *   // any component, any page
 *   const { state, toggleSidebar, closeAll } = useNavigation("main");
 */
export type NavigationState = {
  /** Mobile sidebar (sheet) open/closed */
  sidebarOpen: boolean;
  /** Which top-level nav item (if any) has an open flyout/submenu */
  activeMenu: string | null;
  /** Search overlay open/closed */
  searchOpen: boolean;
  /** Last-active href, useful for active-link styling across islands */
  activeHref: string | null;
};

const defaultState: NavigationState = {
  sidebarOpen: false,
  activeMenu: null,
  searchOpen: false,
  activeHref: null,
};

type Listener = () => void;

type NavigationPatch =
  | Partial<NavigationState>
  | ((prev: NavigationState) => Partial<NavigationState>);

type NavigationContextValue = {
  getState: (key: string) => NavigationState;
  setState: (key: string, patch: NavigationPatch) => void;
  reset: (key: string) => void;
  subscribe: (key: string, listener: Listener) => () => void;
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  // Store lives outside React state so one key's update never re-renders
  // subscribers of a different key — each key notifies only its own listeners.
  const storeRef = useRef<Record<string, NavigationState>>({});
  const listenersRef = useRef<Map<string, Set<Listener>>>(new Map());

  const getState = useCallback((key: string): NavigationState => {
    return storeRef.current[key] ?? defaultState;
  }, []);

  const notify = useCallback((key: string) => {
    listenersRef.current.get(key)?.forEach((listener) => {
      listener();
    });
  }, []);

  const setState = useCallback(
    (key: string, patch: NavigationPatch) => {
      const prev = storeRef.current[key] ?? defaultState;
      const next = typeof patch === "function" ? patch(prev) : patch;
      storeRef.current[key] = { ...prev, ...next };
      notify(key);
    },
    [notify],
  );

  const reset = useCallback(
    (key: string) => {
      storeRef.current[key] = defaultState;
      notify(key);
    },
    [notify],
  );

  const subscribe = useCallback((key: string, listener: Listener) => {
    let set = listenersRef.current.get(key);
    if (!set) {
      set = new Set<Listener>();
      listenersRef.current.set(key, set);
    }
    set.add(listener);
    return () => set.delete(listener);
  }, []);

  const value = useMemo<NavigationContextValue>(
    () => ({ getState, setState, reset, subscribe }),
    [getState, setState, reset, subscribe],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

function useNavigationContext() {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    throw new Error("useNavigation() must be used inside <NavigationProvider>");
  }
  return ctx;
}

/**
 * Scoped navigation state for a given key. Only re-renders when that
 * specific key's state changes — sibling nav instances stay untouched.
 */
export function useNavigation(key: string) {
  const { getState, setState, reset, subscribe } = useNavigationContext();

  const state = useSyncExternalStore(
    (listener) => subscribe(key, listener),
    () => getState(key),
    () => defaultState, // server snapshot
  );

  const set = useCallback(
    (patch: NavigationPatch) => setState(key, patch),
    [key, setState],
  );

  const toggleSidebar = useCallback(
    () => setState(key, (prev) => ({ sidebarOpen: !prev.sidebarOpen })),
    [key, setState],
  );
  const openSidebar = useCallback(
    () => setState(key, { sidebarOpen: true }),
    [key, setState],
  );
  const closeSidebar = useCallback(
    () => setState(key, { sidebarOpen: false }),
    [key, setState],
  );

  const setActiveMenu = useCallback(
    (menu: string | null) => setState(key, { activeMenu: menu }),
    [key, setState],
  );

  const toggleSearch = useCallback(
    () => setState(key, (prev) => ({ searchOpen: !prev.searchOpen })),
    [key, setState],
  );
  const closeSearch = useCallback(
    () => setState(key, { searchOpen: false }),
    [key, setState],
  );

  const setActiveHref = useCallback(
    (href: string | null) => setState(key, { activeHref: href }),
    [key, setState],
  );

  const closeAll = useCallback(
    () =>
      setState(key, {
        sidebarOpen: false,
        activeMenu: null,
        searchOpen: false,
      }),
    [key, setState],
  );

  return {
    state,
    set,
    toggleSidebar,
    openSidebar,
    closeSidebar,
    setActiveMenu,
    toggleSearch,
    closeSearch,
    setActiveHref,
    closeAll,
    reset: () => reset(key),
  };
}
