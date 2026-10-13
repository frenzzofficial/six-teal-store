import type { Metadata } from "next";
import ExplorePage from "@/components/features/explore/ExplorePage";

export const metadata: Metadata = {
  title: "Explore — SixTeal",
};

export default function Page() {
  return <ExplorePage />;
}
