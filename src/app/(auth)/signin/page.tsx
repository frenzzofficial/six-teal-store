import type { Metadata } from "next";
import { Suspense } from "react";
import AuthShell from "@/components/features/auth/AuthShell";
import DevSignIn from "@/components/features/auth/DevSignIn";
import GuestOnly from "@/components/features/auth/GuestOnly";
import { Link } from "@/components/ui";
import SignInForm from "./SignInForm";

export const metadata: Metadata = { title: "Sign in" };

/**
 * The dev shortcut skips the real backend, so it is opt-in: off in production builds and off
 * unless NEXT_PUBLIC_DEV_SIGNIN=true. Everyone else signs in against the auth API.
 */
const SHOW_DEV_SIGNIN =
  process.env.NODE_ENV !== "production" &&
  process.env.NEXT_PUBLIC_DEV_SIGNIN === "true";

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
        {SHOW_DEV_SIGNIN ? <DevSignIn /> : null}
      </GuestOnly>
    </Suspense>
  </AuthShell>
);

export default SignInPage;
