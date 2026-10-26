"use client";

import { useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { GENDER_VALUES } from "@/packages/configs/schema.config";
import { profileFormConfig } from "@/packages/forms/profile.form";
import { updateProfile } from "@/packages/services/account.services";
import { getAuthErrorMessage } from "@/packages/utils/auth-error";
import { changedFields } from "@/packages/utils/form-diff";
import type { AccountResponse, UpdateProfileBody } from "@/types/account";
import type { FormHelpers } from "@/types/form";
import AccountForm, { type AccountFormValues } from "./AccountForm";
import AccountSection from "./AccountSection";

/** Fields the user may empty to clear them; everything except the name. */
const CLEARABLE = ["phone", "birthDate", "gender"] as const;

const config = profileFormConfig.UPDATE_PROFILE;

/** The account as the form shows it: nothing is null, an empty field is "". */
const toFormValues = ({
  user,
  profile,
}: AccountResponse): AccountFormValues<"UPDATE_PROFILE"> => ({
  fullname: user.fullname,
  phone: profile.phone ?? "",
  birthDate: profile.birthDate ?? "",
  // A value the form does not offer shows as "not set" instead of breaking the select.
  gender: GENDER_VALUES.find((value) => value === profile.gender) ?? "",
});

const UpdateProfileForm = ({ account }: { account: AccountResponse }) => {
  const { refreshUser } = useAuth();
  // What is saved on the server right now. Kept in state so a second edit is compared with the
  // first save, not with what the page loaded.
  const [saved, setSaved] = useState(() => toFormValues(account));

  const onSubmit = async (
    values: AccountFormValues<"UPDATE_PROFILE">,
    helpers: FormHelpers,
  ) => {
    // Only what changed goes out.
    const body = changedFields(saved, values, CLEARABLE) as UpdateProfileBody;
    if (Object.keys(body).length === 0) {
      helpers.setFormSuccess("There is nothing new to save.");
      return;
    }

    try {
      const updated = await updateProfile(body);
      const next = toFormValues(updated);
      setSaved(next);
      helpers.reset(next);
      await refreshUser(); // the name shows in the header and on the account page
      helpers.setFormSuccess("Your details were saved.");
    } catch (error: unknown) {
      const message = getAuthErrorMessage(
        error,
        "Couldn't save your details. Please try again.",
      );
      if (/phone/i.test(message)) helpers.setFieldError("phone", message);
      else helpers.setFormError(message);
    }
  };

  return (
    <AccountSection title={config.title} description={config.description}>
      <AccountForm
        formKey="UPDATE_PROFILE"
        columns={2}
        initialValues={saved}
        onSubmit={onSubmit}
      />
    </AccountSection>
  );
};

export default UpdateProfileForm;
