import type { Metadata } from "next";
import { Suspense } from "react";
import AuthShell from "@/components/features/auth/AuthShell";
import GuestOnly from "@/components/features/auth/GuestOnly";
import { Link } from "@/components/ui";
import SignInForm from "./SignInForm";

export const metadata: Metadata = { title: "Sign in" };

const SignInPage = () => (
  <AuthShell
    title="Welcome back"
    description="Sign in to track orders and check out faster."
    footer={
      <p>
        New here?{" "}
        <Link href="/signup" variant="secondary" className="auth-link">
          Create an account
        </Link>
      </p>
    }
  >
    <Suspense fallback={null}>
      <GuestOnly>
        <SignInForm />
      </GuestOnly>
    </Suspense>
  </AuthShell>
);

export default SignInPage;
