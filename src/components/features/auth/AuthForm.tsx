"use client";

import DynamicForm, {
  type DynamicFormProps,
} from "@/components/ui/forms/DynamicForm";
import {
  type AuthSchemaKey,
  authFormConfig,
  authSchemaMap,
} from "@/packages/forms/auth.form";

interface AuthFormProps
  extends Omit<DynamicFormProps, "form" | "schema" | "initialValues"> {
  formKey: AuthSchemaKey;
}

/** Sign-in, sign-up, forgot and reset password. All the work is in DynamicForm. */
const AuthForm = ({ formKey, ...rest }: AuthFormProps) => (
  <DynamicForm
    form={authFormConfig[formKey]}
    schema={authSchemaMap[formKey]}
    presetDefaults
    {...rest}
  />
);

export default AuthForm;
