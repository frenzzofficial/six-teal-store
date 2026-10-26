import type { User } from "@/types/auth";

// What the backend sends for GET/PATCH /v1/account/profile and PATCH /v1/account/preferences,
// and for the device and activity lists under /v1/auth/email.

export interface UserProfile {
  username: string | null;
  bio: string | null;
  phone: string | null;
  /** YYYY-MM-DD */
  birthDate: string | null;
  gender: string | null;
  timezone: string | null;
  locale: string | null;
  website: string | null;
  twitterUrl: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  language: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
}

export interface AccountResponse {
  success: boolean;
  user: User;
  profile: UserProfile;
  preferences: UserPreferences;
}

/** PATCH semantics: leave a field out to keep it, send null to clear it. */
export type UpdateProfileBody = Partial<{
  fullname: string;
  phone: string | null;
  birthDate: string | null;
  gender: string | null;
}>;

export type UpdatePreferencesBody = Partial<
  Pick<UserPreferences, "emailNotifications" | "marketingEmails">
>;

export interface ChangeEmailBody {
  newEmail: string;
  /** Left out for accounts without a password (created through a provider). */
  password?: string;
}

/** One signed-in device, as GET /v1/auth/email/sessions lists it. */
export interface DeviceSession {
  id: string;
  deviceName: string | null;
  platform: string | null;
  browser: string | null;
  os: string | null;
  lastSeenAt: string;
  createdAt: string;
  current: boolean;
}

/** One security event, as GET /v1/auth/email/activity lists it. */
export interface ActivityEntry {
  id: string;
  event: string;
  outcome: "SUCCESS" | "FAILURE";
  deviceName: string | null;
  createdAt: string;
}
