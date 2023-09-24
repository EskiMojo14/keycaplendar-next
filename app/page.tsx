import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "../components/logout-button";
import { ColorPicker, ColorSchemeToggle } from "@/components/color-scheme";
import AppBar from "@/components/md/app-bar";
import IconButton from "@/components/md/icon-button";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <AppBar
        leadingIcon={<IconButton>menu</IconButton>}
        trailingIcons={
          <>
            {user ? (
              <LogoutButton />
            ) : (
              <Link href="/login">
                <IconButton>login</IconButton>
              </Link>
            )}
            <ColorSchemeToggle />
            <ColorPicker />
          </>
        }
      >
        KeycapLendar
      </AppBar>
      <div style={{ height: "100vh" }} />
    </div>
  );
}
