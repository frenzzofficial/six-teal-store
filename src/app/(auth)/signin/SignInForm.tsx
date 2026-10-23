"use client";

import { useRouter, useSearchParams } from "next/navigation";
import AuthForm from "@/components/features/auth/AuthForm";
import SocialSignIn from "@/components/features/auth/SocialSignIn";
import { useAuth } from "@/components/providers/AuthProvider";
import { Link } from "@/components/ui";
import { getAuthErrorMessage } from "@/packages/utils/auth-error";
import { safeRedirectPath } from "@/packages/utils/safe-redirect";
import type { SigninRequestBody } from "@/types/auth";
import type { FormHelpers } from "@/types/form";

const SignInForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn } = useAuth();

  const submit = async (data: unknown, { setFormError }: FormHelpers) => {
    try {
      await signIn(data as SigninRequestBody);
      router.replace(safeRedirectPath(searchParams.get("next")));
    } catch (err: unknown) {
      setFormError(
        getAuthErrorMessage(err, "Sign-in failed. Please try again."),
      );
    }
  };

  return (
    <AuthForm formKey="SIGNIN" onSubmit={submit} footer={<SocialSignIn />}>
      <div className="auth-form__aside">
        <Link href="/forgot-password" variant="secondary" className="auth-link">
          Forgot password?
        </Link>
      </div>
    </AuthForm>
  );
};

export default SignInForm;
