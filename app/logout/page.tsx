import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { route } from "@/logic/lib/route";
import { createServerClient } from "@/logic/supabase/server";

export default async function Logout() {
  const supabase = createServerClient(cookies());

  await supabase.auth.signOut();

  redirect(route("/login"));
}
