import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export default function LogoutButton() {
  return (
    <form action="/auth/sign-out" method="post">
      <Tooltip title="Log out">
        <IconButton type="submit">
          <Icon>logout</Icon>
        </IconButton>
      </Tooltip>
    </form>
  );
}
