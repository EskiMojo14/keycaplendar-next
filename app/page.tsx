import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "../components/logout-button";
import {
  ColorDemo,
  ColorPicker,
  ColorSchemeToggle,
} from "@/components/color-scheme";
import AppBar from "@/components/md/app-bar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material-next/Button";
import Container from "@mui/material/Container";
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
          <Typography component="div" sx={{ flexGrow: 1 }}>
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
      <Container
        maxWidth="sm"
        sx={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
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
        <Button variant="filled">A button</Button>
        <Button variant="filledTonal">A tonal button</Button>
        <ColorDemo />
      </Container>
    </div>
  );
}
