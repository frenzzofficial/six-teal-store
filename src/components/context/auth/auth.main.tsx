"use client";
import z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AuthForm from "@/libs/forms/form.auth";
import { Card } from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";
import { loginAPI, registerAPI } from "@/libs/api/api.auth";
import { useAuth } from "@/components/providers/AuthProvider";
import { FormTemplate, InstanceUseAuthForm } from "./auth.form";
import { useAuthformContext } from "@/components/providers/AuthformProvider";

import {
  loginSchema,
  registerSchema,
  contactSchema,
  resetPasswordSchema,
  updateProfileSchema,
  forgetPasswordSchema,
  updatePasswordSchema,
} from "@/libs/schemas/schema.auth";

// 🔐 Schema Map
export const schemaMap = {
  login: loginSchema,
  register: registerSchema,
  contact: contactSchema,
  forgetPassword: forgetPasswordSchema,
  resetPassword: resetPasswordSchema,
  updatePassword: updatePasswordSchema,
  updateProfile: updateProfileSchema,
};

export type SchemaKey = keyof typeof schemaMap;
export type SchemaType<K extends SchemaKey> = z.infer<(typeof schemaMap)[K]>;

// 🧑‍💻 Form Components
export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = InstanceUseAuthForm("login");

  // const referTo = AuthForm.signin.referTo;
  const router = useRouter();
  const { setUser, setIsAuthenticated } = useAuth();

  const onSubmit = async (data: SchemaType<SchemaKey>): Promise<void> => {
    // console.log("Login submitted:", data);
    try {
      const newData = data as SchemaType<"login">;
      const response = await loginAPI(newData);
      if (response?.status === "success") {
        // Optionally redirect to login page and send a toaster message
        if (response?.data) {
          setUser(response.data);
          setIsAuthenticated(true);
          toast.success(response.message);
          router.push("/");
        }
      }
    } catch (error) {
      const errMsg =
        error instanceof Error ? error.message : "Unexpected error occurred";
      console.error("❌ API error:", errMsg);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 my-6 px-2">
      <Card>
        <FormTemplate
          formList={AuthForm.login}
          register={register}
          control={control}
          errors={errors}
          className="mt-6"
        />
        <div className="center">
          <Button
            type="submit"
            variant="gradient"
            disabled={isSubmitting}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
          >
            {isSubmitting
              ? AuthForm.login.submit?.onSubmitLabel
              : AuthForm.login.submit?.label}
          </Button>
        </div>
      </Card>
    </form>
  );
};

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = InstanceUseAuthForm("register");
  const { setFormType } = useAuthformContext();

  const onSubmit = async (data: SchemaType<SchemaKey>) => {
    // console.log("Register submitted:", data);
    try {
      // Remove confirmPassword before sending to backend
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword: _confirmPassword, ...payload } =
        data as SchemaType<"register">;
      const response = await registerAPI(payload);
      if (response?.status === "success") {
        // Optionally redirect to login page and send a toaster message
        if (response?.data) {
          setFormType("login");
        }
        toast.success(response.message);
      }
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error ? error.message : "Unexpected error occurred";
      console.error("❌ API error:", errMsg);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 my-6 px-2">
      <Card>
        <FormTemplate
          formList={AuthForm.register}
          register={register}
          control={control}
          errors={errors}
          className="mt-6"
        />
        <div className="center">
          <Button
            type="submit"
            variant="gradient"
            disabled={isSubmitting}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
          >
            {isSubmitting
              ? AuthForm.register.submit?.onSubmitLabel
              : AuthForm.register.submit?.label}
          </Button>
        </div>
      </Card>
    </form>
  );
};

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = InstanceUseAuthForm("contact");

  const onSubmit = (data: SchemaType<SchemaKey>): void => {
    console.log("Contact submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 my-6 px-2">
      <Card>
        <FormTemplate
          formList={AuthForm.contact}
          register={register}
          control={control}
          errors={errors}
          className="mt-6"
        />
        <div className="center">
          <Button
            type="submit"
            variant="gradient"
            disabled={isSubmitting}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
          >
            {isSubmitting
              ? AuthForm.contact.submit?.onSubmitLabel
              : AuthForm.contact.submit?.label}
          </Button>
        </div>
      </Card>
    </form>
  );
};

export const ForgetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = InstanceUseAuthForm("forgetPassword");

  const onSubmit = (data: SchemaType<SchemaKey>): void => {
    console.log("ForgetPassword submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 my-6 px-2">
      <Card>
        <FormTemplate
          formList={AuthForm.forgetPassword}
          register={register}
          control={control}
          errors={errors}
          className="mt-6"
        />
        <div className="center">
          <Button
            type="submit"
            variant="gradient"
            disabled={isSubmitting}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
          >
            {isSubmitting
              ? AuthForm.forgetPassword.submit?.onSubmitLabel
              : AuthForm.forgetPassword.submit?.label}
          </Button>
        </div>
      </Card>
    </form>
  );
};

export const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = InstanceUseAuthForm("resetPassword");

  const onSubmit = (data: SchemaType<SchemaKey>): void => {
    console.log("ResetPassword submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 my-6 px-2">
      <Card>
        <FormTemplate
          formList={AuthForm.resetPassword}
          register={register}
          control={control}
          errors={errors}
          className="mt-6"
        />
        <div className="center">
          <Button
            type="submit"
            variant="gradient"
            disabled={isSubmitting}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
          >
            {isSubmitting
              ? AuthForm.resetPassword.submit?.onSubmitLabel
              : AuthForm.resetPassword.submit?.label}
          </Button>
        </div>
      </Card>
    </form>
  );
};

export const UpdatePasswordForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = InstanceUseAuthForm("updatePassword");

  const onSubmit = (data: SchemaType<SchemaKey>) => {
    console.log("UpdatePassword submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 my-6 px-2">
      <Card>
        <FormTemplate
          formList={AuthForm.updatePassword}
          register={register}
          control={control}
          errors={errors}
          className="mt-6"
        />
        <div className="center">
          <Button
            type="submit"
            variant="gradient"
            disabled={isSubmitting}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
          >
            {isSubmitting
              ? AuthForm.updatePassword.submit?.onSubmitLabel
              : AuthForm.updatePassword.submit?.label}
          </Button>
        </div>
      </Card>
    </form>
  );
};

export const UpdateProfileForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = InstanceUseAuthForm("updateProfile");

  const onSubmit = (data: SchemaType<SchemaKey>) => {
    console.log("UpdateProfile submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 my-6 px-2">
      <Card>
        <FormTemplate
          formList={AuthForm.updateProfile}
          register={register}
          control={control}
          errors={errors}
          className="mt-6"
        />
        <div className="center">
          <Button
            type="submit"
            variant="gradient"
            disabled={isSubmitting}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
          >
            {isSubmitting
              ? AuthForm.updateProfile.submit?.onSubmitLabel
              : AuthForm.updateProfile.submit?.label}
          </Button>
        </div>
      </Card>
    </form>
  );
};
