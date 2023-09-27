import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material-next/Button";
import Link from "next/link";
import Messages from "./messages";
import styles from "./page.module.scss";
import AppBar from "@/components/md/app-bar";

export default function Login() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Link href="/" className="no-underline">
            <IconButton>
              <Icon>arrow_back</Icon>
            </IconButton>
          </Link>
          <Typography variant="titleLarge" sx={{ flexGrow: 1, ml: 1 }}>
            Log in
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <form action="/auth/sign-in" method="post" className={styles.form}>
          <TextField
            name="email"
            id="email"
            label="Email"
            required
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon>alternate_email</Icon>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="password"
            id="password"
            label="Password"
            required
            type="password"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon>password</Icon>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="filled">
            Sign in
          </Button>
          <Button
            formAction="/auth/sign-up"
            type="submit"
            variant="filledTonal"
          >
            Sign up
          </Button>
          <Messages />
        </form>
      </Container>
    </>
  );
}
