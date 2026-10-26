import { z } from "zod";
import {
  getEmailDomain,
  isDomainBlacklisted,
  isEmailBlacklisted,
} from "./domains.config";

/**
 * schema.rules.ts
 * ------------------------------------------------------------------
 * Single source of truth for Zod validation rules — framework
 * agnostic, safe to import from a Next.js form, a Hono route, or
 * anywhere else Zod runs. Copy this file (and domains.config.ts)
 * into any project.
 *
 * Convention: every export is a field-level schema named `xRules`,
 * or a factory named `createXRules(...)` when the rule needs a
 * parameter (min age, max file size, etc). Compose them into request
 * schemas with z.object({ ... }) per endpoint — see USAGE EXAMPLES
 * at the bottom of this file.
 * ------------------------------------------------------------------
 */

//  SHARED MESSAGES
export const schemaMessages = {
  required: "This field is required",
  invalid: "Invalid value provided",

  // EMAIL
  emailRequired: "Email is required",
  emailInvalid: "Invalid email format",
  emailDomain: "Email domain is not supported",
  emailTooLong: "Email must not exceed 255 characters",
  emailBlacklisted: "This email address is not allowed",
  emailDomainBlacklisted:
    "Disposable or temporary email addresses are not allowed",

  // FULL NAME
  fullnameRequired: "Full name is required",
  fullnameTooShort: "Full name must be at least 5 characters",
  fullnameTooLong: "Full name must not exceed 100 characters",
  fullnameInvalid: "Full name contains invalid characters",

  // USERNAME
  usernameTooShort: "Username must be at least 5 characters",
  usernameTooLong: "Username must not exceed 30 characters",
  usernameInvalid: "Username may only contain letters, numbers and underscores",

  // PASSWORD
  passwordRequired: "Password is required",
  passwordTooShort: "Password must be at least 8 characters long",
  passwordTooLong: "Password must not exceed 128 characters",
  passwordUpper: "Password must contain at least one uppercase letter",
  passwordLower: "Password must contain at least one lowercase letter",
  passwordNumber: "Password must contain at least one number",
  passwordSpecial: "Password must contain at least one special character",
  passwordNoSpaces: "Password must not contain spaces",
  passwordMismatch: "Passwords do not match",
  weakPassword: "Password is too weak",

  // OTP
  otpRequired: "OTP is required",
  otpInvalid: "OTP must contain exactly 6 digits",
  otpNumeric: "OTP must contain only numbers",

  // TERMS and conditions
  termsRequired: "You must accept the terms and conditions",

  // MESSAGE
  messageRequired: "Message is required",
  messageTooShort: "Message is too short",
  messageTooLong: "Message is too long",
  subjectTooShort: "Subject is too short",
  subjectTooLong: "Subject must not exceed 150 characters",

  // URL
  urlInvalid: "Invalid URL",

  // PHONE
  phoneInvalid: "Invalid phone number format",

  // GENDER
  genderInvalid: "Choose one of the listed options",

  // IDENTIFIERS
  uuidInvalid: "Invalid UUID",
  cuidInvalid: "Invalid identifier",
  mongoIdInvalid: "Invalid identifier",
  slugInvalid: "Slug may only contain lowercase letters, numbers and hyphens",

  // DATE / TIME
  dateInvalid: "Invalid date",
  dateStringInvalid: "Date must be in YYYY-MM-DD format",
  birthdateFuture: "Birthdate cannot be in the future",
  dateRangeInvalid: "End date must be on or after the start date",
  timezoneInvalid: "Invalid IANA timezone identifier",
  localeInvalid: "Invalid locale/language code",

  // NUMBERS
  percentageInvalid: "Value must be between 0 and 100",
  ratingInvalid: "Rating must be a whole number between 1 and 5",
  currencyNegative: "Amount cannot be negative",
  currencyDecimalPlaces: "Amount must not have more than 2 decimal places",
  portInvalid: "Port must be a whole number between 1 and 65535",

  // LOCATION
  countryCodeInvalid: "Country code must be a 2-letter ISO 3166-1 code",
  postalCodeInvalid: "Invalid postal/zip code",
  latitudeInvalid: "Latitude must be between -90 and 90",
  longitudeInvalid: "Longitude must be between -180 and 180",

  // WEB / TECH FORMATS
  hexColorInvalid: "Invalid hex color (e.g. #1A2B3C)",
  ipAddressInvalid: "Invalid IPv4 or IPv6 address",
  jwtInvalid: "Invalid JWT format",
  semverInvalid: "Invalid semantic version (e.g. 1.4.2)",

  // FILES
  filenameRequired: "Filename is required",
  filenameTooLong: "Filename must not exceed 255 characters",
  filenameInvalid: "Filename contains invalid or unsafe characters",
  mimeTypeInvalid: "Invalid MIME type",
  fileTooLarge: "File exceeds the maximum allowed size",

  // MISC / QUERY
  tagRequired: "At least one tag is required",
  tagTooLong: "Each tag must not exceed 30 characters",
  tagsDuplicate: "Duplicate tags are not allowed",
  hashtagInvalid: "Invalid hashtag",
  socialHandleInvalid: "Invalid social handle",
  searchQueryInvalid: "Search query cannot be empty",
};

//    COMMON HELPERS
const trimString = () => z.string().trim();

const _minAgeMessage = (age: number) => `You must be at least ${age} years old`;

const _calculateAge = (birthdate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > birthdate.getMonth() ||
    (today.getMonth() === birthdate.getMonth() &&
      today.getDate() >= birthdate.getDate());
  if (!hasHadBirthdayThisYear) age -= 1;
  return age;
};

// ============================================================
// IDENTITY
// ============================================================

// FULL NAME rules
export const fullnameRules = trimString()
  .min(5, schemaMessages.fullnameTooShort)
  .max(100, schemaMessages.fullnameTooLong)
  .regex(/^[A-Za-z\s'-]+$/, schemaMessages.fullnameInvalid)
  .describe("Full name");

// USERNAME rules
// PASSWORD rules
export const passwordRules = trimString()
  .min(8, schemaMessages.passwordTooShort)
  .max(128, schemaMessages.passwordTooLong)
  .regex(/[A-Z]/, schemaMessages.passwordUpper)
  .regex(/[a-z]/, schemaMessages.passwordLower)
  .regex(/[0-9]/, schemaMessages.passwordNumber)
  .regex(/[^A-Za-z0-9]/, schemaMessages.passwordSpecial)
  .refine((value) => !/\s/.test(value), {
    message: schemaMessages.passwordNoSpaces,
  })
  .describe(
    "Secure password with uppercase, lowercase, number and special character",
  );

export const confirmPasswordRules = trimString().describe("Confirm password");

/**
 * Wraps an object schema with a password === confirmPassword check.
 * Cross-field checks can only happen at the object level in Zod, so
 * this is applied after building the full signup/reset schema:
 *
 *   const signupSchema = withPasswordConfirmation(
 *     z.object({ password: passwordRules, confirmPassword: confirmPasswordRules, ... })
 *   );
 */
export const withPasswordConfirmation = <
  T extends { password: string; confirmPassword: string },
>(
  schema: z.ZodType<T>,
) => withFieldsMatch(schema, "password", "confirmPassword");

/**
 * Same check for any pair of fields, for forms whose password field is not called `password`
 * (change password: `newPassword` + `confirmPassword`). The error lands on the confirm field.
 */
export const withFieldsMatch = <
  F extends string,
  C extends string,
  T extends Record<F | C, string>,
>(
  schema: z.ZodType<T>,
  field: F,
  confirmField: C,
  message: string = schemaMessages.passwordMismatch,
) =>
  schema.refine(
    (data) => {
      const values: Record<string, string> = data;
      return values[field] === values[confirmField];
    },
    { message, path: [confirmField] },
  );

/**
 * A field the user may leave blank. Forms send "" for an empty input, so "" must be valid
 * (it means "nothing" / "clear this"), while anything typed still has to satisfy `rules`.
 */
export const optionalRules = <T extends z.ZodType>(rules: T) =>
  z.union([rules, z.literal("")]).optional();

// TERMS and conditions rules
export const termsAcceptedRules = z
  .boolean()
  .refine((value) => value === true, {
    message: schemaMessages.termsRequired,
  });

// OTP rules
// ============================================================
// EMAIL — two schemas, pick per use case
// ============================================================

/**
 * Default email schema for most projects (signup, contact forms,
 * newsletters). Accepts ANY domain, but rejects disposable/blacklisted
 * domains and explicitly blacklisted addresses.
 */
export const emailRules = z
  .email(schemaMessages.emailInvalid)
  .trim()
  .toLowerCase()
  .min(1, schemaMessages.emailRequired)
  .max(255, schemaMessages.emailTooLong)
  .refine((email) => !isDomainBlacklisted(getEmailDomain(email)), {
    message: schemaMessages.emailDomainBlacklisted,
  })
  .refine((email) => !isEmailBlacklisted(email), {
    message: schemaMessages.emailBlacklisted,
  })
  .describe("Email (any domain, blacklist enforced)");

// ============================================================
// CONTACT
// ============================================================

// International phone number rules
export const phoneRules = trimString()
  .regex(/^\+?[1-9]\d{7,14}$/, schemaMessages.phoneInvalid)
  .describe("International phone number");

// URL rules
// MESSAGE rules
// SUBJECT LINE rules
// ============================================================
// IDENTIFIERS
// ============================================================

// UUID rules
// CUID2 rules (common as a default ID format in Drizzle setups)
// MongoDB ObjectId rules
// SLUG rules (URL-safe identifier, e.g. blog-post-title)
// ============================================================
// DATE / TIME
// ============================================================

// DATE rules (coerces strings/numbers into a Date instance)
const _dateRules = z.coerce.date(schemaMessages.dateInvalid).describe("Date");

// ISO date-only string, e.g. "2026-08-04"
const dateStringRules = z.iso
  .date(schemaMessages.dateStringInvalid)
  .describe("ISO date (YYYY-MM-DD)");

/**
 * Birth date as a form sends it: a "YYYY-MM-DD" string that is not in the future. It stays a
 * string, which is what a date input and the API both use.
 */
export const birthDateStringRules = dateStringRules
  .refine((value) => value <= new Date().toISOString().slice(0, 10), {
    message: schemaMessages.birthdateFuture,
  })
  .describe("Birth date (YYYY-MM-DD, not in the future)");

// GENDER rules (the values the API stores)
export const GENDER_VALUES = [
  "MALE",
  "FEMALE",
  "OTHER",
  "PREFER_NOT_TO_SAY",
] as const;
export const genderRules = z
  .enum(GENDER_VALUES, { message: schemaMessages.genderInvalid })
  .describe("Gender");

// IANA timezone rules, e.g. "Asia/Kolkata"
// BCP-47-style locale/language code, e.g. "en", "en-US", "hi-IN"
// ============================================================
// NUMBERS & PAGINATION
// ============================================================

// PAGINATION rules
// PERCENTAGE rules (0–100)
// RATING rules (1–5 stars)
// CURRENCY AMOUNT rules (non-negative, max 2 decimal places)
// PORT NUMBER rules
// ============================================================
// LOCATION
// ============================================================

// COUNTRY CODE rules (ISO 3166-1 alpha-2, normalized to uppercase)
// POSTAL / ZIP CODE rules (kept permissive — formats vary by country)
// COORDINATES rules
// ============================================================
// WEB / TECH FORMATS
// ============================================================

// HEX COLOR rules, e.g. "#1A2B3C" or "#fff"
// IP ADDRESS rules (v4 or v6)
// BASE64 rules
// JWT-shape rules (structural check only — does not verify signature)
// SEMVER rules, e.g. "1.4.2", "2.0.0-beta.1"
// ============================================================
// FILES
// ============================================================

// FILENAME rules — blocks path traversal and filesystem-reserved characters
// MIME TYPE rules, e.g. "image/png"
// ============================================================
// MISC / QUERY PARAMS
// ============================================================

// TAGS rules — array of short strings, no duplicates
// HASHTAG rules, e.g. "#nextjs" or "nextjs"
// SEARCH QUERY rules
// SORT ORDER rules
