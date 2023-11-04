"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";
import {
  withSchema,
  type FormState,
  type ServerActionReducer,
} from "@/logic/form";
import { route } from "@/logic/lib/route";
import { createServerClient } from "@/logic/supabase/server";

export async function signOut() {
  const supabase = createServerClient(cookies());

  await supabase.auth.signOut();
  redirect(route("/login"));
}

const signInSchema = zfd.formData({
  email: zfd.text(z.string({ required_error: "Email is required" })),
  password: zfd.text(z.string({ required_error: "Password is required" })),
  origin: zfd.text(),
});

export type SignInInput = z.infer<typeof signInSchema>;

export const signIn: ServerActionReducer<
  FormState<SignInInput>,
  FormData
> = withSchema(signInSchema, async (_state, { email, password }) => {
  const supabase = createServerClient(cookies());

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    return { formErrors: [`Could not authenticate user: ${error.message}`] };
  }
  redirect(route("/"));
});

export const signUp = withSchema(
  signInSchema,
  async (_state, { email, password, origin }) => {
    const supabase = createServerClient(cookies());

    console.log(email, password);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });
    if (error) {
      return {
        formErrors: [
          `Could not authenticate user: ${error.message}. Please try again.`,
        ],
      };
    }
    return {
      messages: ["Check email to continue sign in process"],
    };
  },
);

export const resetPassword = withSchema(
  zfd.formData({
    email: zfd.text(z.string({ required_error: "Email is required" })),
    origin: zfd.text(),
  }),
  async (_state, data) => {
    const supabase = createServerClient(cookies());

    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${data.origin}/auth/callback?next=/update-password`,
    });
    if (error) {
      return {
        formErrors: [
          `Failed to send reset email: ${error.message}. Please try again.`,
        ],
      };
    }
    return redirect(route("/reset-password-requested"));
  },
);

const updatePasswordSchema = zfd
  .formData({
    newPassword: zfd.text(z.string({ required_error: "Enter a password" })),
    confirmPassword: zfd.text(),
  })
  .superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (newPassword !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["newPassword"],
        fatal: true,
        message: "Check that your password is the same in both fields",
      });
    }
  });

export const updatePassword = withSchema(
  updatePasswordSchema,
  async (_state, { newPassword }) => {
    const supabase = createServerClient(cookies());

    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      return {
        formErrors: [
          `Failed to change password: ${error.message}. Please try again.`,
        ],
      };
    }
    return redirect(route("/"));
  },
);
