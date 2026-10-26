import type { Metadata } from "next";
import { ProfilePage } from "@/components/features/account/ProfilePage";

export const metadata: Metadata = { title: "Profile" };

export default function Page() {
  return <ProfilePage />;
}
