import type { Metadata } from "next";
import { Suspense } from "react";
import AuthShell from "@/components/features/auth/AuthShell";
import GuestOnly from "@/components/features/auth/GuestOnly";
import { Link } from "@/components/ui";
import ForgotPasswordForm from "./ForgotPasswordForm";

export const metadata: Metadata = { title: "Forgot password" };

const ForgotPasswordPage = () => (
  <AuthShell
    title="Forgot your password?"
    description="Enter your email and we'll send you a reset link."
    footer={
      <p>
        Remembered it?{" "}
        <Link href="/signin" variant="secondary" className="auth-link">
          Back to sign in
        </Link>
      </p>
    }
  >
    <Suspense fallback={null}>
      <GuestOnly>
        <ForgotPasswordForm />
      </GuestOnly>
    </Suspense>
  </AuthShell>
);

export default ForgotPasswordPage;
