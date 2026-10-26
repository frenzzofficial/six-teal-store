"use client";

import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { Icon } from "@/components/ui";
import {
  canAccessDashboard,
  DASHBOARD_NAV,
} from "@/packages/configs/dashboard.config";
import { getInitials } from "@/packages/utils/format";
import DevModeStrip from "./shared/DevModeStrip";

const ROLE_LABELS = {
  ADMIN: "Owner",
  MODERATOR: "Staff",
  USER: "Customer",
} as const;

/**
 * The frame around every /dashboard page: dev strip, sidebar and content area. It also
 * enforces who may be here: (protected)/layout.tsx has already made sure someone is signed
 * in, this checks that their role is allowed into the dashboard at all.
 */
const DashboardShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

  if (!canAccessDashboard(user?.role)) {
    return (
      <div className="dash-root">
        <DevModeStrip />
        <div className="dash-denied">
          <Icon name="lock" size={32} />
          <h1>This area is for the shop team</h1>
          <p>Your account doesn&apos;t have access to the dashboard.</p>
          <NextLink href="/" className="dash-btn dash-btn--primary">
            Back to the store
          </NextLink>
        </div>
      </div>
    );
  }

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const handleSignOut = async () => {
    await signOut();
    router.replace("/signin");
  };

  return (
    <div className="dash-root">
      <DevModeStrip />
      <div className="dash-layout">
        <aside className="dash-sidebar">
          <NextLink href="/dashboard" className="dash-brand">
            <span className="dash-brand__mark" aria-hidden="true">
              S
            </span>
            <span>
              SixTeal <small>Admin</small>
            </span>
          </NextLink>

          <nav className="dash-nav" aria-label="Dashboard">
            {DASHBOARD_NAV.map((item) => (
              <NextLink
                key={item.href}
                href={item.href}
                className="dash-nav__link"
                aria-current={
                  isActive(item.href, item.exact) ? "page" : undefined
                }
              >
                <Icon name={item.icon} size={20} />
                {item.label}
              </NextLink>
            ))}
          </nav>

          <div className="dash-user">
            <span className="dash-user__avatar" aria-hidden="true">
              {getInitials(user?.fullname ?? "")}
            </span>
            <span className="dash-user__text">
              <strong>{user?.fullname}</strong>
              <small>{user?.role ? ROLE_LABELS[user.role] : ""}</small>
            </span>
            <button
              type="button"
              className="dash-user__out"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </div>
        </aside>

        <main className="dash-main" id="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardShell;
