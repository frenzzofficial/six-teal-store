import { type ReactNode, useId } from "react";
import { cn } from "@/packages/utils/cn";

interface AccountSectionProps {
  title: string;
  description?: string;
  /** "danger" is for destructive actions such as deleting the account. */
  tone?: "default" | "danger";
  children: ReactNode;
}

/** One titled card on an account page. */
const AccountSection = ({
  title,
  description,
  tone = "default",
  children,
}: AccountSectionProps) => {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className={cn(
        "account-section",
        tone === "danger" && "account-section--danger",
      )}
    >
      <header className="account-section__header">
        <h2 id={titleId} className="account-section__title">
          {title}
        </h2>
        {description && (
          <p className="account-section__description">{description}</p>
        )}
      </header>
      {children}
    </section>
  );
};

export default AccountSection;
