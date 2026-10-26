import type { User, UserRole } from "@/types/auth";

// ============================================================
// Dev auth
// ------------------------------------------------------------
// A development-only shortcut so the dashboard and account pages can be built and tested
// before the real backend is wired up. It is impossible to switch on in a production build:
// `NODE_ENV` is inlined by Next.js, so the whole feature is dead code there.
//
// Set NEXT_PUBLIC_DEV_AUTH=false in .env.local to turn it off while developing as well.
// ============================================================

export const DEV_AUTH_ENABLED =
  process.env.NODE_ENV !== "production" &&
  process.env.NEXT_PUBLIC_DEV_AUTH !== "false";

export const DEV_SESSION_KEY = "sixteal:dev-session";

export type DevPersonaId = "owner" | "staff" | "customer";

export interface DevPersona {
  id: DevPersonaId;
  label: string;
  description: string;
  /** Where this persona lands after signing in. */
  home: string;
  user: User;
}

// The backend only knows USER / ADMIN / MODERATOR, so the shop roles map onto those:
// owner = ADMIN, staff = MODERATOR, customer = USER.
const persona = (
  id: DevPersonaId,
  role: UserRole,
  label: string,
  description: string,
  home: string,
  fullname: string,
  email: string,
): DevPersona => ({
  id,
  label,
  description,
  home,
  user: {
    id: `dev-${id}`,
    email,
    fullname,
    role,
    status: "ACTIVE",
    hasPassword: true,
    avatarUrl: null,
  },
});

export const DEV_PERSONAS: readonly DevPersona[] = [
  persona(
    "owner",
    "ADMIN",
    "Owner",
    "Full dashboard: orders, products and everything else.",
    "/dashboard",
    "Demo Owner",
    "owner@sixteal.dev",
  ),
  persona(
    "staff",
    "MODERATOR",
    "Staff",
    "Dashboard for day-to-day work: orders and products.",
    "/dashboard",
    "Demo Staff",
    "staff@sixteal.dev",
  ),
  persona(
    "customer",
    "USER",
    "Customer",
    "The storefront account. No dashboard access.",
    "/account",
    "Demo Customer",
    "customer@sixteal.dev",
  ),
];

export const getDevPersona = (id: string | null): DevPersona | null =>
  DEV_PERSONAS.find((p) => p.id === id) ?? null;
