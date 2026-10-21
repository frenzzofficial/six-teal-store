"use client";

import { useEffect } from "react";
import { Button, Icon, Link } from "@/components/ui";

/**
 * error.tsx
 * --------------------------------------------------------------
 * Next's app-router error boundary — catches any uncaught render/fetch
 * error in a route below this one and shows this instead of the
 * framework's default crash screen. Must be a Client Component (Next's
 * requirement) and receives `reset` to retry rendering the segment.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="error-boundary">
      <div className="error-boundary__icon">
        <Icon name="close" />
      </div>
      <p className="error-boundary__eyebrow">Something went wrong</p>
      <h1 className="error-boundary__title">That wasn't supposed to happen.</h1>
      <p className="error-boundary__description">
        An unexpected error interrupted this page. You can try again, or head
        back to something that works.
      </p>
      <div className="error-boundary__actions">
        <Button type="button" onClick={reset}>
          Try Again
        </Button>
        <Link href="/" variant="secondary-button">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
