import type { ReactNode } from "react";
import { Button } from "@/components/ui";
import { Skeleton } from "@/components/ui/shadcn/skeleton";
import type { LoadState } from "@/packages/hooks/useLoad";

interface LoadGateProps<T> {
  state: LoadState<T>;
  onRetry: () => void;
  /** Rows of placeholder shown while loading. */
  rows?: number;
  children: (data: T) => ReactNode;
}

const ROW_KEYS = ["a", "b", "c", "d"] as const;

/**
 * The three states of anything fetched after the page rendered: placeholder rows while it
 * loads, a message with "Try again" if it failed, and `children(data)` once it is there.
 */
function LoadGate<T>({ state, onRetry, rows = 2, children }: LoadGateProps<T>) {
  if (state.status === "loading") {
    return (
      <div className="account-skeleton" aria-busy="true">
        {ROW_KEYS.slice(0, rows).map((key) => (
          <Skeleton key={key} className="account-skeleton__row" />
        ))}
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="account-load-error" role="alert">
        <p>{state.message}</p>
        <Button type="button" variant="secondary" size="sm" onClick={onRetry}>
          Try again
        </Button>
      </div>
    );
  }

  return <>{children(state.data)}</>;
}

export default LoadGate;
