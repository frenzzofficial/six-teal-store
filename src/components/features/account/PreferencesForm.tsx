"use client";

import { useState } from "react";
import { profileFormConfig } from "@/packages/forms/profile.form";
import { updatePreferences } from "@/packages/services/account.services";
import { getAuthErrorMessage } from "@/packages/utils/auth-error";
import { changedFields } from "@/packages/utils/form-diff";
import type { AccountResponse, UpdatePreferencesBody } from "@/types/account";
import type { FormHelpers } from "@/types/form";
import AccountForm, { type AccountFormValues } from "./AccountForm";
import AccountSection from "./AccountSection";

const config = profileFormConfig.UPDATE_PREFERENCES;

const toFormValues = ({ preferences }: AccountResponse) => ({
  emailNotifications: preferences.emailNotifications,
  marketingEmails: preferences.marketingEmails,
});

const PreferencesForm = ({ account }: { account: AccountResponse }) => {
  const [saved, setSaved] = useState(() => toFormValues(account));

  const onSubmit = async (
    values: AccountFormValues<"UPDATE_PREFERENCES">,
    helpers: FormHelpers,
  ) => {
    const body = changedFields(saved, values) as UpdatePreferencesBody;
    if (Object.keys(body).length === 0) {
      helpers.setFormSuccess("There is nothing new to save.");
      return;
    }

    try {
      await updatePreferences(body);
      setSaved(values);
      helpers.reset(values);
      helpers.setFormSuccess("Your preferences were saved.");
    } catch (error: unknown) {
      helpers.setFormError(
        getAuthErrorMessage(error, "Couldn't save your preferences."),
      );
    }
  };

  return (
    <AccountSection title={config.title} description={config.description}>
      <AccountForm
        formKey="UPDATE_PREFERENCES"
        initialValues={saved}
        onSubmit={onSubmit}
      />
    </AccountSection>
  );
};

export default PreferencesForm;
