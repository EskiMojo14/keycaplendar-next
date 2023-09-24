"use client";
import { Mode } from "@mui/system/cssVars/useCurrentColorScheme";
import {
  getInitColorSchemeScript,
  useColorScheme,
  Experimental_CssVarsProvider as CssVarsProvider,
} from "@mui/material/styles";
import { IconButton } from "@mui/material";
import { PropsWithChildren } from "react";
import { useIsMounted } from "@/logic/hooks/use-is-mounted";

export function InitColorScheme() {
  return getInitColorSchemeScript();
}

export function ColorSchemeProvider({ children }: PropsWithChildren) {
  return (
    <CssVarsProvider defaultMode="system" disableStyleSheetGeneration>
      {children}
    </CssVarsProvider>
  );
}

const icons: Record<Mode, string> = {
  light: "light_mode",
  dark: "dark_mode",
  system: "brightness_auto",
};

export function ColorSchemeToggle() {
  const { mode = "system", setMode } = useColorScheme();
  const mounted = useIsMounted();
  if (!mounted) return null;
  return (
    <IconButton
      color="inherit"
      className="material-symbols-rounded"
      onClick={(e) =>
        setMode(e.ctrlKey ? "system" : mode === "dark" ? "light" : "dark")
      }
    >
      {icons[mode]}
    </IconButton>
  );
}
