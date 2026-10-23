import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui";
import { cn } from "@/packages/utils/cn";

type AuthStatusCardProps = {
  tone?: "success" | "error" | "info";
  icon?: IconName;
  title: string;
  children?: ReactNode;
  actions?: ReactNode;
};

/** A centered message for the steps that are not forms: link expired, email verified, … */
const AuthStatusCard = ({
  tone = "info",
  icon = "mail",
  title,
  children,
  actions,
}: AuthStatusCardProps) => (
  <div className={cn("auth-status", `auth-status--${tone}`)}>
    <span className="auth-status__icon">
      <Icon name={icon} size={26} />
    </span>
    <h2 className="auth-status__title">{title}</h2>
    {children && <p className="auth-status__text">{children}</p>}
    {actions && <div className="auth-status__actions">{actions}</div>}
  </div>
);

export default AuthStatusCard;
