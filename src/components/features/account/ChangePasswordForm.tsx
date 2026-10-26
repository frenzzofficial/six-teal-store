"use client";

import PasswordStrength from "@/components/features/auth/PasswordStrength";
import { useAuth } from "@/components/providers/AuthProvider";
import { profileFormConfig } from "@/packages/forms/profile.form";
import { changePassword } from "@/packages/services/auth.services";
import { getAuthErrorMessage } from "@/packages/utils/auth-error";
import type { FormHelpers } from "@/types/form";
import AccountForm from "./AccountForm";
import AccountSection from "./AccountSection";

/** What both password forms hand over; `currentPassword` exists only on CHANGE_PASSWORD. */
interface PasswordFormValues {
  currentPassword?: string;
  newPassword: string;
  confirmPassword: string;
}

interface ChangePasswordFormProps {
  hasPassword: boolean;
  /** Called after a change: the other devices were signed out, so the device list is stale. */
  onChanged: () => void;
}

/**
 * Change password, or, for an account created through Google that has none, set the first one.
 * The two are separate forms (see profile.schema.ts); `hasPassword` picks which one shows.
 */
const ChangePasswordForm = ({
  hasPassword,
  onChanged,
}: ChangePasswordFormProps) => {
  const { user, refreshUser } = useAuth();
  const formKey = hasPassword ? "CHANGE_PASSWORD" : "SET_PASSWORD";
  const config = profileFormConfig[formKey];

  const onSubmit = async (values: PasswordFormValues, helpers: FormHelpers) => {
    try {
      const result = await changePassword({
        ...(hasPassword ? { currentPassword: values.currentPassword } : {}),
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });
      helpers.reset(); // a password must not linger in the form
      helpers.setFormSuccess(
        result.message || (hasPassword ? "Password changed." : "Password set."),
      );
      await refreshUser(); // hasPassword may have flipped to true
      onChanged();
    } catch (error: unknown) {
      const message = getAuthErrorMessage(
        error,
        "Couldn't update your password. Please try again.",
      );
      // The wrong current password belongs under that field; anything else is general.
      if (hasPassword && /current password/i.test(message)) {
        helpers.setFieldError("currentPassword", message);
      } else {
        helpers.setFormError(message);
      }
    }
  };

  return (
    <AccountSection title={config.title} description={config.description}>
      {/* key: switching between the two forms (hasPassword flips) starts a fresh form. */}
      <AccountForm
        key={formKey}
        formKey={formKey}
        onSubmit={onSubmit}
        fieldSlots={{
          newPassword: (value) => (
            <PasswordStrength value={typeof value === "string" ? value : ""} />
          ),
        }}
      >
        {/* Lets password managers file the new password under the right account. */}
        <input
          type="email"
          name="username"
          autoComplete="username"
          value={user?.email ?? ""}
          readOnly
          tabIndex={-1}
          aria-hidden="true"
          className="sr-only"
        />
      </AccountForm>
    </AccountSection>
  );
};

export default ChangePasswordForm;
