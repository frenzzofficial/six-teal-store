import type { Metadata } from "next";
import NotFoundPage from "@/components/layouts/NotFoundPage";

export const metadata: Metadata = {
  title: "Page not found — SixTeal",
};

export default function NotFound() {
  return <NotFoundPage />;
}
