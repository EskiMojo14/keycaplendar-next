import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { route } from "@/logic/lib/route";

export default async function Logout() {
  const supabase = createServerComponentClient({ cookies });

  await supabase.auth.signOut();

  redirect(route("/login"));
}
