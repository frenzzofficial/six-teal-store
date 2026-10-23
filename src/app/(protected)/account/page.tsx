import type { Metadata } from "next";
import { AccountPage } from "@/components/features/account/AccountPage";

export const metadata: Metadata = { title: "My account" };

export default function Page() {
  return <AccountPage />;
}
