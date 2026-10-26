import type { Metadata } from "next";
import { Suspense } from "react";
import AuthShell from "@/components/features/auth/AuthShell";
import ConfirmEmailChange from "./ConfirmEmailChange";

export const metadata: Metadata = { title: "Confirm new email" };

const ConfirmEmailChangePage = () => (
  <AuthShell
    title="New email address"
    description="Confirming your new address."
  >
    <Suspense fallback={null}>
      <ConfirmEmailChange />
    </Suspense>
  </AuthShell>
);

export default ConfirmEmailChangePage;
