import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "./logic/supabase/middleware";

export async function middleware(req: NextRequest) {
  // Create a Supabase client configured to use cookies
  const { supabase, response } = createMiddlewareClient(req);

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  await supabase.auth.getSession();

  return response;
}
