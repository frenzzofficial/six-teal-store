"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import AuthForm from "@/components/features/auth/AuthForm";
import AuthStatusCard from "@/components/features/auth/AuthStatusCard";
import PasswordStrength from "@/components/features/auth/PasswordStrength";
import { Link } from "@/components/ui";
import { resetPassword } from "@/packages/services/auth.services";
import { getAuthErrorMessage } from "@/packages/utils/auth-error";
import type { ResetPasswordRequestBody } from "@/types/auth";
import type { FormHelpers } from "@/types/form";

const ResetPasswordForm = () => {
  const router = useRouter();
  const token = useSearchParams().get("token") ?? "";
  const [done, setDone] = useState(false);

  if (!token) {
    return (
      <AuthStatusCard
        tone="error"
        icon="lock"
        title="This link isn't valid"
        actions={
          <Link href="/forgot-password" variant="primary-button">
            Request a new link
          </Link>
        }
      >
        The reset link is missing its token. Request a new one and try again.
      </AuthStatusCard>
    );
  }

  if (done) {
    return (
      <AuthStatusCard
        tone="success"
        icon="check-circle"
        title="Password updated"
        actions={
          <Link href="/signin" variant="primary-button">
            Sign in
          </Link>
        }
      >
        Your password has been reset. You can sign in with the new one.
      </AuthStatusCard>
    );
  }

  const submit = async (data: unknown, { setFormError }: FormHelpers) => {
    // `data` already includes `token`: DynamicForm registers hiddenFields as real values.
    try {
      await resetPassword(data as ResetPasswordRequestBody);
      setDone(true);
      router.prefetch("/signin");
    } catch (err: unknown) {
      setFormError(
        getAuthErrorMessage(
          err,
          "Couldn't reset your password. The link may have expired.",
        ),
      );
    }
  };

  return (
    <AuthForm
      formKey="RESET_PASSWORD"
      onSubmit={submit}
      hiddenFields={{ token }}
      fieldSlots={{
        password: (value) => (
          <PasswordStrength
            id="password-strength"
            value={String(value ?? "")}
          />
        ),
      }}
    />
  );
};

export default ResetPasswordForm;
