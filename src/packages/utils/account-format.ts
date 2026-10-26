import type { DeviceSession } from "@/types/account";

const EVENT_LABELS: Record<string, string> = {
  SIGN_UP: "Account created",
  SIGN_IN_SUCCESS: "Signed in",
  SIGN_IN_FAILURE: "Failed sign-in attempt",
  ACCOUNT_LOCKED: "Account temporarily locked",
  SIGN_OUT: "Signed out",
  REFRESH_REUSE_DETECTED: "Session ended: token reuse detected",
  REAUTH_FAILURE: "Re-authentication failed",
  EMAIL_VERIFIED: "Email verified",
  PASSWORD_RESET_REQUESTED: "Password reset requested",
  PASSWORD_RESET_COMPLETED: "Password reset",
  PASSWORD_CHANGED: "Password changed",
  EMAIL_CHANGE_REQUESTED: "Email change requested",
  EMAIL_CHANGED: "Email address changed",
  SESSION_REVOKED: "A device was signed out",
  OTHER_SESSIONS_REVOKED: "Other devices signed out",
  PROFILE_UPDATED: "Profile updated",
  PREFERENCES_UPDATED: "Preferences updated",
  OAUTH_ACCOUNT_LINKED: "Sign-in provider linked",
  ACCOUNT_RECLAIMED: "Account reclaimed",
};

/** A readable label for a backend audit event; unknown events fall back to a tidied name. */
export const eventLabel = (event: string): string =>
  EVENT_LABELS[event] ??
  event.charAt(0) + event.slice(1).toLowerCase().replaceAll("_", " ");

/** The best name we have for a device: its own name, else "Browser on OS", else a placeholder. */
export const deviceTitle = (session: DeviceSession): string =>
  session.deviceName ??
  ([session.browser, session.os].filter(Boolean).join(" on ") ||
    "Unknown device");
