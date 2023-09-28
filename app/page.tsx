import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "../components/logout-button";
import { ColorPicker, ColorSchemeToggle } from "@/components/color-scheme";
import { DisplayTable } from "@/components/display";
import AppBar from "@/components/md/app-bar";
import { selectKeysets } from "@/logic/drizzle";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const entries = await selectKeysets;

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="titleLarge" component="div" sx={{ flexGrow: 1 }}>
            KeycapLendar
          </Typography>
          {user ? (
            <LogoutButton />
          ) : (
            <Tooltip title="Log in">
              <Link href="/login" style={{ textDecoration: "none" }}>
                <IconButton>
                  <Icon>login</Icon>
                </IconButton>
              </Link>
            </Tooltip>
          )}
          <ColorSchemeToggle />
          <ColorPicker />
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <DisplayTable data={entries} />
      </Container>
    </div>
  );
}
