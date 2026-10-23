"use client";

import NextLink from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import AuthForm from "@/components/features/auth/AuthForm";
import AuthStatusCard from "@/components/features/auth/AuthStatusCard";
import PasswordStrength from "@/components/features/auth/PasswordStrength";
import SocialSignIn from "@/components/features/auth/SocialSignIn";
import { useAuth } from "@/components/providers/AuthProvider";
import { Button, Link } from "@/components/ui";
import { resendVerification } from "@/packages/services/auth.services";
import { getAuthErrorMessage } from "@/packages/utils/auth-error";
import { safeRedirectPath } from "@/packages/utils/safe-redirect";
import type { SignupRequestBody } from "@/types/auth";
import type { FormHelpers } from "@/types/form";

type ResendState = "idle" | "sending" | "sent" | "failed";

const SignupForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signUp } = useAuth();
  // Set once the account exists but the email still has to be verified.
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [resend, setResend] = useState<ResendState>("idle");

  const submit = async (data: unknown, { setFormError }: FormHelpers) => {
    const credentials = data as SignupRequestBody;
    try {
      const res = await signUp(credentials);
      if (res.requiresVerification) {
        // The account exists but nobody is signed in until the emailed link is opened.
        setPendingEmail(credentials.email);
        return;
      }
      router.replace(safeRedirectPath(searchParams.get("next")));
    } catch (err: unknown) {
      setFormError(
        getAuthErrorMessage(err, "Sign-up failed. Please try again."),
      );
    }
  };

  const resendEmail = async () => {
    if (!pendingEmail) return;
    setResend("sending");
    try {
      await resendVerification(pendingEmail);
      setResend("sent");
    } catch {
      setResend("failed");
    }
  };

  if (pendingEmail) {
    return (
      <AuthStatusCard
        tone="success"
        title="Check your inbox"
        actions={
          <>
            <Button
              type="button"
              variant="secondary"
              onClick={resendEmail}
              disabled={resend === "sending" || resend === "sent"}
            >
              {resend === "sent" ? "Email sent again" : "Resend email"}
            </Button>
            <Link href="/signin" variant="primary-button">
              Go to sign in
            </Link>
          </>
        }
      >
        We sent a verification link to <strong>{pendingEmail}</strong>. Open it
        to activate your account, then sign in.
        {resend === "failed" &&
          " We couldn't resend it just now. Please try again."}
      </AuthStatusCard>
    );
  }

  return (
    <AuthForm
      formKey="SIGNUP"
      onSubmit={submit}
      footer={<SocialSignIn />}
      fieldSlots={{
        password: (value) => (
          <PasswordStrength
            id="password-strength"
            value={String(value ?? "")}
          />
        ),
      }}
    >
      <p className="auth-form__note">
        By creating an account you accept our{" "}
        <NextLink href="/terms" className="auth-link">
          Terms
        </NextLink>{" "}
        and{" "}
        <NextLink href="/privacy" className="auth-link">
          Privacy Policy
        </NextLink>
        .
      </p>
    </AuthForm>
  );
};

export default SignupForm;
