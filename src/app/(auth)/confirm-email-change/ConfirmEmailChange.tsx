"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AuthStatusCard from "@/components/features/auth/AuthStatusCard";
import { useAuth } from "@/components/providers/AuthProvider";
import { Link } from "@/components/ui";
import { confirmEmailChange } from "@/packages/services/account.services";
import { getAuthErrorMessage } from "@/packages/utils/auth-error";

type State =
  | { kind: "confirming" }
  | { kind: "confirmed" }
  | { kind: "failed"; message: string };

/**
 * The page the change-email message links to: `/confirm-email-change?token=...`. Like the
 * verify-email page, the token is spent on the first call, so the request must run exactly once
 * (StrictMode runs effects twice in dev).
 */
const ConfirmEmailChange = () => {
  const token = useSearchParams().get("token") ?? "";
  const { refreshUser } = useAuth();
  const [state, setState] = useState<State>(
    token
      ? { kind: "confirming" }
      : { kind: "failed", message: "This link is missing its token." },
  );
  const hasRun = useRef(false);

  useEffect(() => {
    if (!token || hasRun.current) return;
    hasRun.current = true;

    confirmEmailChange(token)
      .then(async () => {
        await refreshUser(); // if signed in here, the address in the header just changed
        setState({ kind: "confirmed" });
      })
      .catch((error: unknown) =>
        setState({
          kind: "failed",
          message: getAuthErrorMessage(
            error,
            "This link is invalid or has expired.",
          ),
        }),
      );
  }, [token, refreshUser]);

  if (state.kind === "confirming") {
    return (
      <AuthStatusCard icon="mail" title="Confirming your new email">
        This only takes a moment.
      </AuthStatusCard>
    );
  }

  if (state.kind === "confirmed") {
    return (
      <AuthStatusCard
        tone="success"
        icon="check-circle"
        title="Email address changed"
        actions={
          <Link href="/account" variant="primary-button">
            Go to my account
          </Link>
        }
      >
        Use your new address the next time you sign in.
      </AuthStatusCard>
    );
  }

  return (
    <AuthStatusCard
      tone="error"
      icon="lock"
      title="We couldn't confirm that link"
      actions={
        <Link href="/account/security" variant="primary-button">
          Back to security settings
        </Link>
      }
    >
      {state.message}
    </AuthStatusCard>
  );
};

export default ConfirmEmailChange;
