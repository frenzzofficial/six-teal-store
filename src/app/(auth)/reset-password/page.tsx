import type { Metadata } from "next";
import { Suspense } from "react";
import AuthShell from "@/components/features/auth/AuthShell";
import ResetPasswordForm from "./ResetPasswordForm";

export const metadata: Metadata = { title: "Reset password" };

// Not wrapped in GuestOnly: this page is opened from an emailed link, whatever the session.
const ResetPasswordPage = () => (
  <AuthShell
    title="Choose a new password"
    description="Pick something strong that you don't use elsewhere."
  >
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  </AuthShell>
);

export default ResetPasswordPage;
