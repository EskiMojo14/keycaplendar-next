import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { route } from "@/logic/lib/route";
import { createServerClient } from "@/logic/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the Auth Helpers package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  const errorCode = requestUrl.searchParams.get("error");
  const errorDesc = requestUrl.searchParams.get("error_description");
  if (errorCode || errorDesc) {
    const errorUrl = new URL(
      requestUrl.origin +
        route(
          `/auth/callback/error?error_description=${
            errorDesc ?? "An unknown error occurred, please try again"
          }`,
        ),
    );
    return NextResponse.redirect(errorUrl);
  }

  if (code) {
    const supabase = createServerClient(cookies());
    await supabase.auth.exchangeCodeForSession(code);
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(
    requestUrl.searchParams.get("next") ?? requestUrl.origin,
  );
}
