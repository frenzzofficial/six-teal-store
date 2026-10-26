"use client";

import { useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui";
import { resendVerification } from "@/packages/services/auth.services";
import { getAuthErrorMessage } from "@/packages/utils/auth-error";

type SendState =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "failed"; message: string };

/** Shown on every account page while the signed-in address is not verified yet. */
const VerifyEmailNotice = () => {
  const { user } = useAuth();
  const [send, setSend] = useState<SendState>({ kind: "idle" });

  if (user?.status !== "PENDING_VERIFICATION") return null;

  const resend = async () => {
    setSend({ kind: "sending" });
    try {
      await resendVerification(user.email);
      setSend({ kind: "sent" });
    } catch (error: unknown) {
      setSend({
        kind: "failed",
        message: getAuthErrorMessage(
          error,
          "Couldn't send the email. Please try again.",
        ),
      });
    }
  };

  return (
    <div className="account-notice section-bleed__inner">
      <output className="account-notice__text">
        <strong>Verify your email.</strong>{" "}
        {send.kind === "sent"
          ? `We sent a new link to ${user.email}.`
          : `Open the link we sent to ${user.email} to confirm it's yours.`}
        {send.kind === "failed" && (
          <span className="account-notice__error"> {send.message}</span>
        )}
      </output>
      {send.kind !== "sent" && (
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={send.kind === "sending"}
          onClick={resend}
        >
          {send.kind === "sending" ? "Sending…" : "Resend email"}
        </Button>
      )}
    </div>
  );
};

export default VerifyEmailNotice;
