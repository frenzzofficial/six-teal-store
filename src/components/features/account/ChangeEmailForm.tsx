"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { profileFormConfig } from "@/packages/forms/profile.form";
import { changeEmail } from "@/packages/services/account.services";
import { getAuthErrorMessage } from "@/packages/utils/auth-error";
import type { FormHelpers } from "@/types/form";
import AccountForm from "./AccountForm";
import AccountSection from "./AccountSection";

/** What both email forms hand over; `emailPassword` exists only on CHANGE_EMAIL. */
interface EmailFormValues {
  newEmail: string;
  emailPassword?: string;
}

const ChangeEmailForm = ({ hasPassword }: { hasPassword: boolean }) => {
  const { user } = useAuth();
  const formKey = hasPassword ? "CHANGE_EMAIL" : "CHANGE_EMAIL_PROVIDER";
  const config = profileFormConfig[formKey];

  const onSubmit = async (values: EmailFormValues, helpers: FormHelpers) => {
    try {
      const result = await changeEmail({
        newEmail: values.newEmail,
        ...(hasPassword && values.emailPassword
          ? { password: values.emailPassword }
          : {}),
      });
      helpers.reset();
      // The address only changes once the emailed link is opened.
      helpers.setFormSuccess(
        result.message ||
          `We sent a confirmation link to ${values.newEmail}. Open it to finish.`,
      );
    } catch (error: unknown) {
      const message = getAuthErrorMessage(
        error,
        "Couldn't start the email change. Please try again.",
      );
      if (hasPassword && /password/i.test(message)) {
        helpers.setFieldError("emailPassword", message);
      } else {
        helpers.setFormError(message);
      }
    }
  };

  return (
    <AccountSection title={config.title} description={config.description}>
      <p className="account-section__note">
        Your current address is <strong>{user?.email}</strong>. It stays in use
        until you open the link we send to the new one.
      </p>
      <AccountForm key={formKey} formKey={formKey} onSubmit={onSubmit} />
    </AccountSection>
  );
};

export default ChangeEmailForm;
