import Button from "./md/button";

export default function LogoutButton() {
  return (
    <form action="/auth/sign-out" method="post">
      <Button icon="logout" variant="filled-tonal" type="submit">
        Log out
      </Button>
    </form>
  );
}
