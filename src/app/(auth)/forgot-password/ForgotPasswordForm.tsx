"use client";

import { useState } from "react";
import AuthForm from "@/components/features/auth/AuthForm";
import AuthStatusCard from "@/components/features/auth/AuthStatusCard";
import { Link } from "@/components/ui";
import { forgotPassword } from "@/packages/services/auth.services";
import type { ForgotPasswordRequestBody } from "@/types/auth";

const ForgotPasswordForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const submit = async (data: unknown): Promise<void> => {
    try {
      await forgotPassword(data as ForgotPasswordRequestBody);
    } catch (err: unknown) {
      // Deliberately not shown, and the confirmation does not branch on success vs failure:
      // "no account with that email" is a classic email-enumeration leak. The backend answers
      // the same way whether or not the address exists.
      if (process.env.NODE_ENV === "development") {
        console.warn("[forgot-password] request failed:", err);
      }
    } finally {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <AuthStatusCard
        tone="success"
        title="Check your email"
        actions={
          <Link href="/signin" variant="primary-button">
            Back to sign in
          </Link>
        }
      >
        If an account exists for that email, a password reset link is on its
        way. Check your inbox (and spam folder). The link expires after a short
        while.
      </AuthStatusCard>
    );
  }

  return <AuthForm formKey="FORGOT_PASSWORD" onSubmit={submit} />;
};

export default ForgotPasswordForm;
