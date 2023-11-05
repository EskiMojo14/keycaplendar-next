/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Database } from "@/types/supabase";
import { createServerClient as createClient } from "@supabase/ssr";
import type { cookies } from "next/headers";

export const createServerClient = (cookieStore: ReturnType<typeof cookies>) => {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: { persistSession: false },
      cookies: {
        get(name) {
          return cookieStore.get(name || "")?.value;
        },
        set(name, value, options) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name, options) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};
