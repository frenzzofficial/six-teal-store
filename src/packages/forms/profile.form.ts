import {
  changeEmailProviderSchema,
  changeEmailSchema,
  changePasswordSchema,
  deleteAccountProviderSchema,
  deleteAccountSchema,
  setPasswordSchema,
  updatePreferencesSchema,
  updateProfileSchema,
} from "@/packages/schemas/profile.schema";
import type { FormInputType, FormListType } from "@/types/form";

// Account-side forms, described the same way as auth.form.ts. To add a form: write its schema
// in profile.schema.ts, add a config below and a key in `profileSchemaMap`. `profileFormConfig`
// is typed by the keys of that map, so it fails to compile if the two lists ever disagree, and
// AccountForm renders the new form with no further code.

export const profileSchemaMap = {
  UPDATE_PROFILE: updateProfileSchema,
  UPDATE_PREFERENCES: updatePreferencesSchema,
  CHANGE_PASSWORD: changePasswordSchema,
  SET_PASSWORD: setPasswordSchema,
  CHANGE_EMAIL: changeEmailSchema,
  CHANGE_EMAIL_PROVIDER: changeEmailProviderSchema,
  DELETE_ACCOUNT: deleteAccountSchema,
  DELETE_ACCOUNT_PROVIDER: deleteAccountProviderSchema,
} as const;

export type ProfileFormKey = keyof typeof profileSchemaMap;

// Fields shared by more than one form.
const newPasswordInputs: FormInputType[] = [
  {
    key: "NEW-PASSWORD",
    id: "newPassword",
    label: "New password",
    type: "password",
    placeholder: "Enter a new password",
    autoComplete: "new-password",
    required: true,
    errorMessage: "Password is required",
  },
  {
    key: "NEW-PASSWORD-CONFIRM",
    id: "confirmPassword",
    label: "Confirm new password",
    type: "password",
    placeholder: "Repeat the new password",
    autoComplete: "new-password",
    required: true,
    errorMessage: "Please confirm your password",
  },
];

const newEmailInput: FormInputType = {
  key: "NEW-EMAIL",
  id: "newEmail",
  label: "New email address",
  type: "email",
  placeholder: "you@example.com",
  autoComplete: "email",
  required: true,
  errorMessage: "Email is required",
};

const confirmPasswordInput = (key: string, id: string): FormInputType => ({
  key,
  id,
  label: "Your password",
  type: "password",
  placeholder: "Enter your current password",
  autoComplete: "current-password",
  required: true,
  errorMessage: "Enter your password to confirm",
});

const deleteConfirmationInput: FormInputType = {
  key: "DELETE-CONFIRMATION",
  id: "confirmation",
  label: "Type DELETE to confirm",
  type: "text",
  placeholder: "DELETE",
  autoComplete: "off",
  required: true,
  errorMessage: "Type DELETE to confirm",
};

export const profileFormConfig: Record<ProfileFormKey, FormListType> = {
  UPDATE_PROFILE: {
    key: "UPDATE_PROFILE",
    title: "Personal details",
    description: "Your name and the contact details we use for deliveries.",
    submit: { label: "Save changes", onSubmitLabel: "Saving..." },
    formInputs: [
      {
        key: "PROFILE-FULLNAME",
        id: "fullname",
        label: "Full name",
        type: "text",
        placeholder: "Enter your full name",
        autoComplete: "name",
        required: true,
        errorMessage: "Full name is required",
      },
      {
        key: "PROFILE-PHONE",
        id: "phone",
        label: "Phone number",
        type: "tel",
        placeholder: "+91 98765 43210",
        autoComplete: "tel",
        required: false,
        errorMessage: "Enter a valid phone number",
      },
      {
        key: "PROFILE-BIRTHDATE",
        id: "birthDate",
        label: "Birth date",
        type: "date",
        placeholder: "",
        autoComplete: "bday",
        required: false,
        errorMessage: "Enter a valid date",
      },
      {
        key: "PROFILE-GENDER",
        id: "gender",
        label: "Gender",
        type: "select",
        placeholder: "",
        options: [
          { label: "Male", value: "MALE" },
          { label: "Female", value: "FEMALE" },
          { label: "Other", value: "OTHER" },
          { label: "Prefer not to say", value: "PREFER_NOT_TO_SAY" },
        ],
        required: false,
        errorMessage: "Choose one of the options",
      },
    ],
  },

  UPDATE_PREFERENCES: {
    key: "UPDATE_PREFERENCES",
    title: "Email preferences",
    description: "Choose which emails you get from us.",
    submit: { label: "Save preferences", onSubmitLabel: "Saving..." },
    formInputs: [
      {
        key: "PREFS-EMAIL",
        id: "emailNotifications",
        label: "Order and account updates",
        type: "checkbox",
        placeholder: "",
        required: false,
        errorMessage: "",
      },
      {
        key: "PREFS-MARKETING",
        id: "marketingEmails",
        label: "Offers and news",
        type: "checkbox",
        placeholder: "",
        required: false,
        errorMessage: "",
      },
    ],
  },

  CHANGE_PASSWORD: {
    key: "CHANGE_PASSWORD",
    title: "Change password",
    description: "Changing it signs you out of your other devices.",
    submit: { label: "Change password", onSubmitLabel: "Changing..." },
    formInputs: [
      {
        key: "CURRENT-PASSWORD",
        id: "currentPassword",
        label: "Current password",
        type: "password",
        placeholder: "Enter your current password",
        autoComplete: "current-password",
        required: true,
        errorMessage: "Password is required",
      },
      ...newPasswordInputs,
    ],
  },

  SET_PASSWORD: {
    key: "SET_PASSWORD",
    title: "Set a password",
    description:
      "You signed up with Google. A password lets you also sign in with your email.",
    submit: { label: "Set password", onSubmitLabel: "Saving..." },
    formInputs: newPasswordInputs,
  },

  CHANGE_EMAIL: {
    key: "CHANGE_EMAIL",
    title: "Email address",
    description:
      "We send a confirmation link to the new address. It only changes once you open it.",
    submit: { label: "Send confirmation link", onSubmitLabel: "Sending..." },
    formInputs: [
      newEmailInput,
      confirmPasswordInput("EMAIL-PASSWORD", "emailPassword"),
    ],
  },

  CHANGE_EMAIL_PROVIDER: {
    key: "CHANGE_EMAIL_PROVIDER",
    title: "Email address",
    description:
      "We send a confirmation link to the new address. It only changes once you open it.",
    submit: { label: "Send confirmation link", onSubmitLabel: "Sending..." },
    formInputs: [newEmailInput],
  },

  DELETE_ACCOUNT: {
    key: "DELETE_ACCOUNT",
    title: "Delete account",
    description: "Permanently removes your account and signs out every device.",
    submit: { label: "Delete my account", onSubmitLabel: "Deleting..." },
    formInputs: [
      deleteConfirmationInput,
      confirmPasswordInput("DELETE-PASSWORD", "deletePassword"),
    ],
  },

  DELETE_ACCOUNT_PROVIDER: {
    key: "DELETE_ACCOUNT_PROVIDER",
    title: "Delete account",
    description: "Permanently removes your account and signs out every device.",
    submit: { label: "Delete my account", onSubmitLabel: "Deleting..." },
    formInputs: [deleteConfirmationInput],
  },
};
