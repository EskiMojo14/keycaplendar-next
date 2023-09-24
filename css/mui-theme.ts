import { experimental_extendTheme as extendTheme } from "@mui/material";

export const theme = extendTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--md-sys-color-surface)",
          color: "var(--md-sys-color-on-surface)",
          boxShadow: "var(--elevation-2)",
        },
      },
    },
  },
});

export default theme;
