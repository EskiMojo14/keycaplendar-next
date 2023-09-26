import Link from "next/link";
import Messages from "./messages";
import AppBar from "@/components/md/app-bar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import styles from "./page.module.scss";
import Button from "@mui/material-next/Button";

export default function Login() {
  return (
    <>
      <AppBar
        leadingIcon={
          <Link href="/" className="no-underline">
            <IconButton>
              <Icon>arrow_back</Icon>
            </IconButton>
          </Link>
        }
      >
        Log in
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
