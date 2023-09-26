import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";

export default function LogoutButton() {
  return (
    <form action="/auth/sign-out" method="post">
      <IconButton type="submit">
        <Icon>logout</Icon>
      </IconButton>
    </form>
  );
}
