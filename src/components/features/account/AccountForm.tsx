"use client";

import DynamicForm, {
  type DynamicFormProps,
} from "@/components/ui/forms/DynamicForm";
import {
  type ProfileFormKey,
  profileFormConfig,
  profileSchemaMap,
} from "@/packages/forms/profile.form";
import type { FormValues } from "@/packages/utils/create-form-registry";
import type { FormHelpers } from "@/types/form";

/** The values a given account form submits, e.g. AccountFormValues<"CHANGE_EMAIL">. */
export type AccountFormValues<K extends ProfileFormKey> = FormValues<
  typeof profileSchemaMap,
  K
>;

interface AccountFormProps<K extends ProfileFormKey>
  extends Omit<
    DynamicFormProps,
    | "form"
    | "schema"
    | "onSubmit"
    | "initialValues"
    | "presetDefaults"
    | "submitClassName"
    | "submitSize"
    | "fieldsClassName"
  > {
  formKey: K;
  /** The user's current values; the form starts from them. */
  initialValues?: Partial<AccountFormValues<K>>;
  /**
   * Called with the validated values, already typed for this form. May be async; use `helpers`
   * to show a server error under a field, or a confirmation above the button.
   */
  onSubmit?: (
    values: AccountFormValues<K>,
    helpers: FormHelpers,
  ) => void | Promise<void>;
  /** Lay the fields out in two columns on wide screens. */
  columns?: 1 | 2;
  /** Style the submit button as a destructive action. */
  danger?: boolean;
}

/**
 * Profile, password, email, preference and delete forms. All the work is in DynamicForm; this
 * only picks the config and schema for `formKey`, fits the form into an account card, and types
 * what comes back.
 */
function AccountForm<K extends ProfileFormKey>({
  formKey,
  initialValues,
  onSubmit,
  columns = 1,
  danger = false,
  ...rest
}: AccountFormProps<K>) {
  return (
    <DynamicForm
      form={profileFormConfig[formKey]}
      schema={profileSchemaMap[formKey]}
      initialValues={initialValues}
      onSubmit={
        onSubmit &&
        ((data, helpers) => onSubmit(data as AccountFormValues<K>, helpers))
      }
      fieldsClassName={columns === 2 ? "account-form__fields--2" : undefined}
      submitSize="md"
      submitClassName={
        danger
          ? "account-form__submit from-destructive via-destructive to-destructive/80 border-destructive/30 text-white"
          : "account-form__submit"
      }
      {...rest}
    />
  );
}

export default AccountForm;
