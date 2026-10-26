import { z } from "zod";
import {
  emailRules,
  fullnameRules,
  passwordRules,
  termsAcceptedRules,
  withPasswordConfirmation,
} from "../configs/schema.config";

// SCHEMA
export const signupSchema = withPasswordConfirmation(
  z.object({
    fullname: fullnameRules,
    email: emailRules,
    password: passwordRules,
    confirmPassword: passwordRules,
    agreeToTerms: termsAcceptedRules,
  }),
).describe("Registration form");

// Sign-in only needs to confirm a password was entered — complexity was
// already enforced at signup, and re-checking it here would reject a
// correct password for any account created under older/different rules.
// Actual correctness is verified server-side against the stored hash.
const signinPasswordRules = z.string().min(1, "Password is required");

export const signinSchema = z.object({
  email: emailRules,
  password: signinPasswordRules,
  remember: z.boolean().optional(),
});

export const forgetPasswordSchema = z.object({
  email: emailRules,
});

export const resetPasswordSchema = withPasswordConfirmation(
  z.object({
    token: z.string().min(1, "Token is required"),
    password: passwordRules,
    confirmPassword: passwordRules,
  }),
);

// SCHEMA OUTPUT
