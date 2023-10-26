"use server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";
import type { FormState, ServerActionReducer } from "@/logic/form";
import { route } from "@/logic/lib/route";

export async function signOut() {
  const supabase = createRouteHandlerClient({ cookies });

  await supabase.auth.signOut();
  redirect(route("/login"));
}

const signInSchema = zfd.formData({
  email: zfd.text(z.string({ required_error: "Email is required" })),
  password: zfd.text(z.string({ required_error: "Password is required" })),
  origin: zfd.text(),
});

export const signIn: ServerActionReducer<FormState, FormData> = async (
  _state,
  formData,
) => {
  const parsed = signInSchema.safeParse(formData);
  if (!parsed.success) {
    return parsed.error.flatten();
  }
  const { email, password } = parsed.data;
  const supabase = createRouteHandlerClient({ cookies });

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    return { formErrors: ["Could not authenticate user"] };
  }
  redirect(route("/"));
};

export const signUp: ServerActionReducer<FormState, FormData> = async (
  _state,
  formData,
) => {
  const parsed = signInSchema.safeParse(formData);
  if (!parsed.success) {
    return parsed.error.flatten();
  }
  const { email, password, origin } = parsed.data;
  const supabase = createRouteHandlerClient({ cookies });

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });
  if (error) {
    return { formErrors: ["Could not authenticate user"] };
  }
  return {
    messages: ["Check email to continue sign in process"],
  };
};
