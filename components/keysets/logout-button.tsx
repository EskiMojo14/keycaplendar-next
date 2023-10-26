import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Button from "../govuk/button";
import { route } from "@/logic/lib/route";

export default function LogoutButton() {
  async function signOut() {
    "use server";
    const supabase = createRouteHandlerClient({ cookies });

    await supabase.auth.signOut();
    redirect(route("/login"));
  }
  return (
    <form action={signOut}>
      <Button type="submit">Log out</Button>
    </form>
  );
}
