import { z } from "zod";
import {
  birthDateStringRules,
  confirmPasswordRules,
  emailRules,
  fullnameRules,
  genderRules,
  optionalRules,
  passwordRules,
  phoneRules,
  schemaMessages,
  withFieldsMatch,
} from "../configs/schema.config";

// Account-side schemas: what a signed-in user edits about themselves. They sit next to
// auth.schema.ts (which is about getting IN) and follow the same conventions: field rules come
// from schema.config.ts, cross-field checks are wrapped around the finished object.
//
// Optional text fields accept "" because a form sends "" for an empty input. The caller turns
// "" into "clear this field" (null) when it builds the API request.
//
// Accounts created through Google have no password, so the forms that ask for one come in two
// versions (X and X_PROVIDER). The page picks the version from `user.hasPassword`.

/** Mirrors PATCH /account/profile. The email is NOT here: it changes through CHANGE_EMAIL. */
export const updateProfileSchema = z.object({
  fullname: fullnameRules,
  phone: optionalRules(phoneRules),
  birthDate: optionalRules(birthDateStringRules),
  gender: optionalRules(genderRules),
});

/** Mirrors PATCH /account/preferences. */
export const updatePreferencesSchema = z.object({
  emailNotifications: z.boolean(),
  marketingEmails: z.boolean(),
});

/** Mirrors POST /auth/email/change-password. */
export const changePasswordSchema = withFieldsMatch(
  z.object({
    // Not held to the complexity rules: it only has to be what the user already has, and a
    // password from before a policy change must still be accepted here.
    currentPassword: z.string().min(1, schemaMessages.passwordRequired),
    newPassword: passwordRules,
    confirmPassword: confirmPasswordRules,
  }),
  "newPassword",
  "confirmPassword",
).refine((data) => data.currentPassword !== data.newPassword, {
  message: "New password must be different from the current password",
  path: ["newPassword"],
});

/** The same endpoint for accounts with NO password yet: this form SETS the first one. */
export const setPasswordSchema = withFieldsMatch(
  z.object({
    newPassword: passwordRules,
    confirmPassword: confirmPasswordRules,
  }),
  "newPassword",
  "confirmPassword",
);

/** Mirrors POST /auth/email/change-email (a confirmation link goes to the new address). */
export const changeEmailSchema = z.object({
  newEmail: emailRules,
  emailPassword: z.string().min(1, schemaMessages.passwordRequired),
});

/** Accounts without a password re-authenticate by a recent sign-in instead. */
export const changeEmailProviderSchema = z.object({
  newEmail: emailRules,
});

/**
 * Mirrors POST /account/delete. The typed word only guards against a misclick, so it is
 * checked here and never sent; `deletePassword` is the re-authentication the backend asks for.
 */
const DELETE_CONFIRMATION_WORD = "DELETE";

const confirmationRules = z
  .string()
  .refine(
    (value) => value.trim() === DELETE_CONFIRMATION_WORD,
    `Type ${DELETE_CONFIRMATION_WORD} to confirm`,
  );

export const deleteAccountSchema = z.object({
  confirmation: confirmationRules,
  deletePassword: z.string().min(1, schemaMessages.passwordRequired),
});

export const deleteAccountProviderSchema = z.object({
  confirmation: confirmationRules,
});
