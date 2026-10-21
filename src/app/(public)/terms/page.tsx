import type { Metadata } from "next";
import {
  LegalPage,
  type LegalSection,
} from "@/components/features/content/LegalPage";
import appConfig from "@/packages/configs/app.config";
import {
  FREE_SHIPPING_THRESHOLD,
  RETURN_WINDOW_DAYS,
} from "@/packages/configs/commerce.config";
import { formatPrice } from "@/packages/utils/format";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that apply when you use the Six Teal store.",
};

const email = appConfig.author.email;

const SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of terms",
    body: (
      <p>
        By browsing or placing an order on Six Teal, you agree to these terms.
        If you do not agree, please do not use the store.
      </p>
    ),
  },
  {
    id: "orders",
    title: "Orders and availability",
    body: (
      <p>
        Product availability and prices can change without notice. An order is
        confirmed once we send you an order confirmation, and we may cancel an
        order (with a full refund) if an item is unavailable or priced
        incorrectly.
      </p>
    ),
  },
  {
    id: "pricing",
    title: "Pricing and payment",
    body: (
      <p>
        All prices are shown in Indian rupees (₹) and include applicable taxes
        unless stated otherwise. Payment is taken at checkout using the methods
        offered at the time.
      </p>
    ),
  },
  {
    id: "shipping",
    title: "Shipping",
    body: (
      <p>
        Orders of {formatPrice(FREE_SHIPPING_THRESHOLD)} or more ship free;
        smaller orders are charged a flat shipping fee shown before you pay.
        Delivery estimates are shown at checkout and are not guaranteed.
      </p>
    ),
  },
  {
    id: "returns",
    title: "Returns and refunds",
    body: (
      <p>
        You can return eligible items within {RETURN_WINDOW_DAYS} days of
        delivery, unused and in their original packaging. Contact us with your
        order number to start a return; approved refunds go back to your
        original payment method.
      </p>
    ),
  },
  {
    id: "use-of-site",
    title: "Using the store",
    body: (
      <ul>
        <li>Do not misuse the site or attempt to disrupt its operation.</li>
        <li>Provide accurate information when you order or contact us.</li>
        <li>
          Content on the site, including text, images and branding, belongs to
          Six Teal or its licensors and may not be copied without permission.
        </li>
      </ul>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <p>
        To the extent the law allows, Six Teal is not liable for indirect or
        consequential losses arising from your use of the store. Nothing in
        these terms limits rights you have under consumer law.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: (
      <p>
        We may update these terms from time to time. Continuing to use the store
        after a change means you accept the updated terms.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        Questions about these terms? Email{" "}
        <a href={`mailto:${email}`}>{email}</a>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      lead="The simple ground rules for shopping with Six Teal."
      updated="20 October 2026"
      sections={SECTIONS}
    />
  );
}
