"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import {
  type Control,
  type FieldErrors,
  type Resolver,
  type SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import type { z } from "zod";
import { Button, type ButtonSize } from "@/components/ui";
import InputFactory, {
  type InputFactoryProps,
} from "@/components/ui/inputs/InputFactory";
import { formsConfig } from "@/packages/configs/forms.config";
import { cn } from "@/packages/utils/cn";
import type { FormHelpers, FormInputType, FormListType } from "@/types/form";

export interface DynamicFormProps {
  /** What to draw: fields and submit labels. Comes from a *.form.ts config. */
  form: FormListType;
  /** What to enforce: the Zod schema that belongs to `form`. */
  schema: z.ZodType;
  /**
   * Gets the validated values. May be async. `helpers` reports a server error under a field
   * or above the button.
   */
  onSubmit?: (data: unknown, helpers: FormHelpers) => void | Promise<void>;
  isLoading?: boolean;
  className?: string;
  /** Layout of the field list, e.g. a two-column grid. Defaults to one column. */
  fieldsClassName?: string;
  /** Classes for the submit button. Defaults to a full-width button (the auth pages). */
  submitClassName?: string;
  submitSize?: ButtonSize;
  /** Starting values, e.g. the signed-in user's profile. */
  initialValues?: Record<string, unknown>;
  /** Prefill fullname/email with the demo values from formsConfig (development builds only). */
  presetDefaults?: boolean;
  /** Values that are part of the payload but never user-editable, e.g. a reset `token`. */
  hiddenFields?: Record<string, string>;
  /** Content drawn under a field, keyed by field id; a function receives the live value. */
  fieldSlots?: Record<
    string,
    React.ReactNode | ((value: unknown) => React.ReactNode)
  >;
  /** Rendered after the fields, before the submit button, e.g. "Forgot password?". */
  children?: React.ReactNode;
  /** Rendered after the submit button, e.g. social sign-in. */
  footer?: React.ReactNode;
}

const buildDefaultValues = (
  form: FormListType,
  options: Pick<
    DynamicFormProps,
    "hiddenFields" | "initialValues" | "presetDefaults"
  >,
): Record<string, unknown> => {
  const values: Record<string, unknown> = { ...options.hiddenFields };
  const presets: Record<string, unknown> = options.presetDefaults
    ? formsConfig.defaultValues
    : {};

  for (const field of form.formInputs) {
    const initial = options.initialValues?.[field.id];
    const preset = presets[field.id];
    values[field.id] =
      initial !== undefined && initial !== null
        ? initial
        : preset !== undefined
          ? preset
          : (field.defaultValue ?? (field.type === "checkbox" ? false : ""));
  }

  return values;
};

const FieldSlot = ({
  id,
  control,
  slot,
}: {
  id: string;
  control: Control<Record<string, unknown>>;
  slot: React.ReactNode | ((value: unknown) => React.ReactNode);
}) => {
  const value = useWatch({ control, name: id });
  return <>{typeof slot === "function" ? slot(value) : slot}</>;
};

const errorMessageOf = (error: unknown): string =>
  error && typeof error === "object" && "message" in error
    ? String((error as { message: unknown }).message)
    : "";

/**
 * The one form renderer. It knows nothing about auth: give it a config (what to draw) and a
 * schema (what to enforce) and it builds the fields, validates as you type, and hands the
 * validated values to `onSubmit`. AuthForm is a thin wrapper that picks the config and schema.
 */
const DynamicForm = ({
  form,
  schema,
  onSubmit: externalSubmit,
  isLoading = false,
  className,
  fieldsClassName,
  submitClassName = "auth-submit",
  submitSize = "lg",
  initialValues,
  presetDefaults = false,
  hiddenFields,
  fieldSlots,
  children,
  footer,
}: DynamicFormProps) => {
  const defaultValues = useMemo(
    () =>
      buildDefaultValues(form, { hiddenFields, initialValues, presetDefaults }),
    [form, hiddenFields, initialValues, presetDefaults],
  );

  const resolver = zodResolver(
    schema as Parameters<typeof zodResolver>[0],
  ) as unknown as Resolver<Record<string, unknown>>;

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Record<string, unknown>>({
    resolver,
    defaultValues,
    mode: "onTouched",
    reValidateMode: "onChange",
    shouldFocusError: true,
    shouldUnregister: false,
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  // Server messages live in our own state: react-hook-form mutates its errors object in place,
  // which React (and the React Compiler) would not see as a change.
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

  const helpers: FormHelpers = {
    setFieldError: (fieldId, message) =>
      setServerErrors((prev) => ({ ...prev, [fieldId]: message })),
    setFormError,
    setFormSuccess,
    reset: (values) => {
      reset(values ? { ...defaultValues, ...values } : defaultValues);
      setServerErrors({});
    },
  };

  // A server message belongs to the value that was sent: editing that field removes it, and
  // any edit makes a "saved" confirmation stale.
  useEffect(() => {
    const subscription = watch((_values, { name }) => {
      if (!name) return;
      setFormSuccess(null);
      setServerErrors((prev) => {
        if (!(name in prev)) return prev;
        const { [name]: _removed, ...rest } = prev;
        return rest;
      });
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<Record<string, unknown>> = async (data) => {
    setFormError(null);
    setFormSuccess(null);
    setServerErrors({});
    await externalSubmit?.(data, helpers);
  };

  const pending = isLoading || isSubmitting;
  const mergedErrors: FieldErrors<Record<string, unknown>> = errors;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn("auth-form", className)}
    >
      {hiddenFields &&
        Object.keys(hiddenFields).map((key) => (
          <input key={key} type="hidden" {...register(key)} />
        ))}

      <div className={cn("auth-form__fields", fieldsClassName)}>
        {form.formInputs.map((input: FormInputType) => {
          const renderer = InputFactory[input.type];
          const message =
            serverErrors[input.id] ?? errorMessageOf(mergedErrors[input.id]);
          const props: InputFactoryProps = {
            id: input.id,
            type: input.type,
            label: input.label,
            placeholder: input.placeholder,
            required: input.required,
            autoComplete: input.autoComplete,
            options: input.options,
            register: register as InputFactoryProps["register"],
            control: control as InputFactoryProps["control"],
            error: { message },
          };
          const slot = fieldSlots?.[input.id];

          return (
            <div key={input.key} className="auth-field">
              {input.type !== "checkbox" && (
                <label htmlFor={input.id} className="auth-field__label">
                  {input.label}
                  {input.required && (
                    <span className="auth-field__required" aria-hidden="true">
                      *
                    </span>
                  )}
                </label>
              )}
              {renderer?.(props)}
              {slot !== undefined && (
                <FieldSlot id={input.id} control={control} slot={slot} />
              )}
            </div>
          );
        })}
      </div>

      {children}

      {formError && (
        <p role="alert" className="auth-alert">
          {formError}
        </p>
      )}

      {formSuccess && <output className="auth-notice">{formSuccess}</output>}

      {form.submit && (
        <Button
          type="submit"
          size={submitSize}
          className={submitClassName}
          disabled={pending}
        >
          {pending ? form.submit.onSubmitLabel : form.submit.label}
        </Button>
      )}

      {footer}
    </form>
  );
};

export default DynamicForm;
