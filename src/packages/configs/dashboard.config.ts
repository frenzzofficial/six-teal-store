import type { IconName } from "@/components/ui";
import { type UserRole, UserRoles } from "@/packages/configs/roles.config";

/** Who may open /dashboard. Owner = ADMIN, staff = MODERATOR; customers (USER) may not. */
const DASHBOARD_ROLES: readonly UserRole[] = [
  UserRoles.ADMIN,
  UserRoles.MODERATOR,
];

export const canAccessDashboard = (role: UserRole | undefined): boolean =>
  !!role && DASHBOARD_ROLES.includes(role);

export interface DashboardNavItem {
  href: string;
  label: string;
  icon: IconName;
  /** Matches only this exact path (the overview), not everything below it. */
  exact?: boolean;
}

export const DASHBOARD_NAV: readonly DashboardNavItem[] = [
  { href: "/dashboard", label: "Overview", icon: "layout-grid", exact: true },
  { href: "/dashboard/orders", label: "Orders", icon: "package" },
  { href: "/dashboard/products", label: "Products", icon: "shopping-bag" },
];
