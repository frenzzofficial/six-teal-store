import type { Metadata } from "next";
import {
  LegalPage,
  type LegalSection,
} from "@/components/features/content/LegalPage";
import appConfig from "@/packages/configs/app.config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Six Teal collects, uses and protects your information.",
};

const email = appConfig.author.email;

const SECTIONS: LegalSection[] = [
  {
    id: "overview",
    title: "Overview",
    body: (
      <p>
        This policy explains what information Six Teal collects when you browse
        or shop with us, how we use it, and the choices you have. We aim to
        collect only what we need to run the store and serve you well.
      </p>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: (
      <>
        <p>Depending on how you use the store, we may collect:</p>
        <ul>
          <li>
            <strong>Order details</strong> — your name, shipping address, email
            and the items you buy.
          </li>
          <li>
            <strong>Messages</strong> — what you send us through the contact
            form or by email.
          </li>
          <li>
            <strong>Device storage</strong> — your cart, wishlist and
            in-progress checkout are kept in your browser so they are still
            there when you return.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How we use your information",
    body: (
      <ul>
        <li>To process, ship and support your orders.</li>
        <li>To reply to your questions and requests.</li>
        <li>To improve the store and keep it secure.</li>
        <li>
          To send you offers or news, only if you have subscribed — and you can
          unsubscribe at any time.
        </li>
      </ul>
    ),
  },
  {
    id: "sharing",
    title: "Sharing your information",
    body: (
      <p>
        We do not sell your personal information. We share it only with
        providers who help us deliver your order (such as couriers and payment
        processors), and where the law requires it.
      </p>
    ),
  },
  {
    id: "storage-and-cookies",
    title: "Browser storage",
    body: (
      <p>
        Your cart, wishlist and checkout progress are saved in your browser's
        local storage. You can clear them at any time from your browser
        settings; doing so will empty your cart and wishlist on that device.
      </p>
    ),
  },
  {
    id: "your-choices",
    title: "Your choices",
    body: (
      <p>
        You can ask us to access, correct or delete the personal information we
        hold about you. Email <a href={`mailto:${email}`}>{email}</a> and we
        will respond as soon as we can.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this policy from time to time. The date at the top of the
        page shows when it last changed.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        Questions about privacy? Reach us at{" "}
        <a href={`mailto:${email}`}>{email}</a>.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      lead="Your privacy matters. Here is what we collect, why, and how you stay in control."
      updated="20 October 2026"
      sections={SECTIONS}
    />
  );
}
