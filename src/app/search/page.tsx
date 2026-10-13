import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchPage } from "@/components/features/search/SearchPage";

export const metadata: Metadata = {
  title: "Search — SixTeal",
};

export default function Page() {
  // SearchPage reads useSearchParams(), which requires a Suspense
  // boundary in the app router (otherwise the whole route opts out of
  // static rendering with a build warning).
  return (
    <Suspense fallback={null}>
      <SearchPage />
    </Suspense>
  );
}
