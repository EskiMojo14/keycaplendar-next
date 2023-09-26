import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "../components/logout-button";
import { ColorPicker, ColorSchemeToggle } from "@/components/color-scheme";
import AppBar from "@/components/md/app-bar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton>
            <Icon>menu</Icon>
          </IconButton>
          <Typography
            variant="titleLarge"
            component="div"
            sx={{ flexGrow: 1, ml: 1 }}
          >
            KeycapLendar
          </Typography>
          {user ? (
            <LogoutButton />
          ) : (
            <Link href="/login" style={{ textDecoration: "none" }}>
              <IconButton>
                <Icon>login</Icon>
              </IconButton>
            </Link>
          )}
          <ColorSchemeToggle />
          <ColorPicker />
        </Toolbar>
      </AppBar>
    </div>
  );
}
