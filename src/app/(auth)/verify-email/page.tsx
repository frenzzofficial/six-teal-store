import type { Metadata } from "next";
import { Suspense } from "react";
import AuthShell from "@/components/features/auth/AuthShell";
import VerifyEmail from "./VerifyEmail";

export const metadata: Metadata = { title: "Verify email" };

const VerifyEmailPage = () => (
  <AuthShell title="Email verification" description="Confirming your address.">
    <Suspense fallback={null}>
      <VerifyEmail />
    </Suspense>
  </AuthShell>
);

export default VerifyEmailPage;
