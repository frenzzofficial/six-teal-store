import type { Metadata } from "next";
import TrendingPage from "@/components/features/trending/TrendingPage";

export const metadata: Metadata = {
  title: "Trending — SixTeal",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  return <TrendingPage searchParams={params} />;
}
