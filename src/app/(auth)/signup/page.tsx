import type { Metadata } from "next";
import { Suspense } from "react";
import AuthShell from "@/components/features/auth/AuthShell";
import GuestOnly from "@/components/features/auth/GuestOnly";
import { Link } from "@/components/ui";
import SignupForm from "./SignupForm";

export const metadata: Metadata = { title: "Create account" };

const SignUpPage = () => (
  <AuthShell
    title="Create your account"
    description="Join in a minute. Guest checkout stays available."
    footer={
      <p>
        Already have an account?{" "}
        <Link href="/signin" variant="secondary" className="auth-link">
          Sign in
        </Link>
      </p>
    }
  >
    <Suspense fallback={null}>
      <GuestOnly>
        <SignupForm />
      </GuestOnly>
    </Suspense>
  </AuthShell>
);

export default SignUpPage;
