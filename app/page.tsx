import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "../components/logout-button";
import { ColorPicker, ColorSchemeToggle } from "@/components/color-scheme";
import AppBar from "@/components/md/app-bar";
import IconButton from "@/components/md/icon-button";
import { InputAdornment, TextField } from "@mui/material";
import Symbol from "@/components/md/symbol";

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
      <div style={{ height: "100vh", padding: "8px" }}>
        <TextField
          label="Label text"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Symbol>search</Symbol>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Symbol>cancel</Symbol>
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
