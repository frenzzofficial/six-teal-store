"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AuthStatusCard from "@/components/features/auth/AuthStatusCard";
import { Link } from "@/components/ui";
import { verifyEmail } from "@/packages/services/auth.services";
import { getAuthErrorMessage } from "@/packages/utils/auth-error";

type State =
  | { kind: "verifying" }
  | { kind: "verified" }
  | { kind: "failed"; message: string };

/**
 * The page the verification email links to: `/verify-email?token=...`. The token is spent on
 * the first call, so the request must run exactly once (StrictMode runs effects twice in dev).
 */
const VerifyEmail = () => {
  const token = useSearchParams().get("token") ?? "";
  const [state, setState] = useState<State>(
    token
      ? { kind: "verifying" }
      : {
          kind: "failed",
          message: "This verification link is missing its token.",
        },
  );
  const hasRun = useRef(false);

  useEffect(() => {
    if (!token || hasRun.current) return;
    hasRun.current = true;

    verifyEmail(token)
      .then(() => setState({ kind: "verified" }))
      .catch((err: unknown) =>
        setState({
          kind: "failed",
          message: getAuthErrorMessage(
            err,
            "This verification link is invalid or has expired.",
          ),
        }),
      );
  }, [token]);

  if (state.kind === "verifying") {
    return (
      <AuthStatusCard icon="mail" title="Verifying your email">
        This only takes a moment.
      </AuthStatusCard>
    );
  }

  if (state.kind === "verified") {
    return (
      <AuthStatusCard
        tone="success"
        icon="check-circle"
        title="Email verified"
        actions={
          <Link href="/signin" variant="primary-button">
            Sign in
          </Link>
        }
      >
        Your email is confirmed. You can sign in now.
      </AuthStatusCard>
    );
  }

  return (
    <AuthStatusCard
      tone="error"
      icon="lock"
      title="We couldn't verify that link"
      actions={
        <Link href="/signin" variant="primary-button">
          Back to sign in
        </Link>
      }
    >
      {state.message}
    </AuthStatusCard>
  );
};

export default VerifyEmail;
