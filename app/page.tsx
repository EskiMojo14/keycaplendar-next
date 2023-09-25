import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "../components/logout-button";
import { ColorPicker, ColorSchemeToggle } from "@/components/color-scheme";
import AppBar from "@/components/md/app-bar";
import IconButton from "@/components/md/icon-button";
import { Icon, InputAdornment, TextField } from "@mui/material";

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
              <Link href="/login" style={{ textDecoration: "none" }}>
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
      <div style={{ height: "100vh", padding: "8px" }}>
        <TextField
          label="Label text"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon>search</Icon>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Icon>cancel</Icon>
              </InputAdornment>
            ),
          }}
          helperText="Supporting label"
          sx={{ mt: 1 }}
        />
      </div>
    </div>
  );
}
