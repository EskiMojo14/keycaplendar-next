import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";
import { ColorSchemeToggle } from "@/components/md/color-scheme";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <nav>
        <div>
          <div className="label-medium">
            {user ? (
              <div>
                Hey, {user.email}!
                <LogoutButton />
              </div>
            ) : (
              <Link href="/login">Login</Link>
            )}
            <ColorSchemeToggle />
          </div>
        </div>
      </nav>
    </div>
  );
}
