"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { profileFormConfig } from "@/packages/forms/profile.form";
import { deleteAccount } from "@/packages/services/account.services";
import { getAuthErrorMessage } from "@/packages/utils/auth-error";
import type { FormHelpers } from "@/types/form";
import AccountForm from "./AccountForm";
import AccountSection from "./AccountSection";

/** What both delete forms hand over; `deletePassword` exists only on DELETE_ACCOUNT. */
interface DeleteFormValues {
  confirmation: string;
  deletePassword?: string;
}

/**
 * Closed until asked for: the form is not on the page by default, so a stray click can never
 * land on it. Opening it still needs the typed word (and the password, when the account has one).
 */
const DeleteAccountForm = ({ hasPassword }: { hasPassword: boolean }) => {
  const [open, setOpen] = useState(false);
  const formKey = hasPassword ? "DELETE_ACCOUNT" : "DELETE_ACCOUNT_PROVIDER";
  const config = profileFormConfig[formKey];

  const onSubmit = async (values: DeleteFormValues, helpers: FormHelpers) => {
    try {
      await deleteAccount(hasPassword ? values.deletePassword : undefined);
    } catch (error: unknown) {
      const message = getAuthErrorMessage(
        error,
        "Couldn't delete your account. Please try again.",
      );
      if (hasPassword && /password/i.test(message)) {
        helpers.setFieldError("deletePassword", message);
      } else {
        helpers.setFormError(message);
      }
      return;
    }

    // The server already removed the account and cleared the cookies. A full page load, not a
    // client-side navigation: the account is gone, and a route change would race the protected
    // layout, which sends signed-out visitors to /signin.
    window.location.replace("/");
  };

  return (
    <AccountSection
      tone="danger"
      title={config.title}
      description="This cannot be undone. Your profile, sign-in methods, devices and activity history are removed for good."
    >
      {open ? (
        <AccountForm
          key={formKey}
          formKey={formKey}
          danger
          onSubmit={onSubmit}
          footer={
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          }
        />
      ) : (
        <div>
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={() => setOpen(true)}
          >
            Delete my account…
          </Button>
        </div>
      )}
    </AccountSection>
  );
};

export default DeleteAccountForm;
