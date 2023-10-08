import Button from "./govuk/button";

export default function LogoutButton() {
  return (
    <form action="/auth/sign-out" method="post">
      <Button type="submit">Log out</Button>
    </form>
  );
}
