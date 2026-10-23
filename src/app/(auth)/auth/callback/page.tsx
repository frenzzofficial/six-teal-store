import type { Metadata } from "next";
import { Suspense } from "react";
import AuthShell from "@/components/features/auth/AuthShell";
import OAuthCallback from "@/components/features/auth/OAuthCallback";

export const metadata: Metadata = {
  title: "Signing in",
  robots: { index: false },
};

const CallbackPage = () => (
  <AuthShell title="Signing you in" description="Finishing your sign-in.">
    <Suspense fallback={null}>
      <OAuthCallback />
    </Suspense>
  </AuthShell>
);

export default CallbackPage;
