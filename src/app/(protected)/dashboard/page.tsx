import type { Metadata } from "next";
import OverviewPage from "@/components/features/dashboard/overview/OverviewPage";

export const metadata: Metadata = { title: "Overview" };

export default function Page() {
  return <OverviewPage />;
}
