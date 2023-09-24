import IconButton from "./md/icon-button";

export default function LogoutButton() {
  return (
    <form action="/auth/sign-out" method="post">
      <IconButton type="submit">logout</IconButton>
    </form>
  );
}
