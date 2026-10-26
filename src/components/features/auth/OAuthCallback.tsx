"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { Link } from "@/components/ui";
import { clearDevSession } from "@/packages/utils/dev-session";
import { safeRedirectPath } from "@/packages/utils/safe-redirect";
import AuthStatusCard from "./AuthStatusCard";

// What the backend puts in `?error=` when a provider sign-in does not finish.
const ERROR_MESSAGES: Record<string, string> = {
  access_denied: "You cancelled the sign-in.",
  provider_error: "The provider reported a problem. Please try again.",
  state_invalid:
    "That sign-in attempt expired or was already used. Please start again.",
  exchange_failed: "We couldn't complete the sign-in. Please try again.",
  token_invalid: "The provider's response couldn't be verified.",
  email_missing: "The provider did not share an email address.",
  email_unverified:
    "The provider hasn't verified that email address, so we can't use it.",
  account_blocked: "This account can't sign in right now.",
  provider_conflict:
    "This email is already linked to a different account with that provider.",
  server_error: "Something went wrong on our side. Please try again.",
};

const DEFAULT_ERROR = "Sign-in failed. Please try again.";

/**
 * Renders at `/auth/callback`, where the backend sends the browser after EVERY provider
 * attempt (it never answers with JSON, because the browser is mid-redirect):
 *   ?status=success&redirect=/path  → the session cookies are already set; load the user
 *   ?status=error&error=<code>      → show a message for that code
 */
const OAuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const hasRun = useRef(false);

  // Only the first mount's params matter: this is a one-time hand-off.
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional one-time run on mount only
  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    if (searchParams.get("status") !== "success") {
      const code = searchParams.get("error") ?? "";
      setErrorMessage(ERROR_MESSAGES[code] ?? DEFAULT_ERROR);
      return;
    }

    (async () => {
      clearDevSession();
      await refreshUser();
      router.replace(safeRedirectPath(searchParams.get("redirect")));
    })();
  }, []);

  if (errorMessage === null) {
    return (
      <AuthStatusCard icon="shield" title="Completing sign-in">
        One moment while we finish signing you in.
      </AuthStatusCard>
    );
  }

  return (
    <AuthStatusCard
      tone="error"
      icon="lock"
      title="Sign-in didn't finish"
      actions={
        <Link href="/signin" variant="primary-button">
          Back to sign in
        </Link>
      }
    >
      {errorMessage}
    </AuthStatusCard>
  );
};

export default OAuthCallback;
