"use client";
import { useState, useMemo, createContext } from "react";
import { Mode } from "@mui/system/cssVars/useCurrentColorScheme";
import {
  getInitColorSchemeScript,
  useColorScheme,
  Experimental_CssVarsProvider as CssVarsProvider,
} from "@mui/material/styles";
import { IconButton } from "@mui/material";
import { PropsWithChildren } from "react";
import { useIsMounted } from "@/logic/hooks/use-is-mounted";
import { braidArrays } from "@/logic/lib/utils";
import {
  themeFromSourceColor,
  Theme,
} from "@material/material-color-utilities";
import { kebabCase } from "lodash";
import { useSafeContext } from "@/logic/hooks/use-safe-context";

const css = (strings: TemplateStringsArray, ...expressions: Array<unknown>) =>
  braidArrays(strings, expressions).join("");

const test = css`
  :root {
    --test: black;
  }
`;

export function InitColorScheme() {
  return getInitColorSchemeScript();
}

export function MuiColorSchemeProvider({ children }: PropsWithChildren) {
  return (
    <CssVarsProvider defaultMode="system" disableStyleSheetGeneration>
      {children}
    </CssVarsProvider>
  );
}

const argbToHex = (n: number) => {
  const argb = n.toString(16);
  return "#" + argb.slice(2, 8) + argb.slice(0, 2);
};

const hexToArgb = (hex: string) => parseInt("ff" + hex.slice(1), 16);

const hexToChannel = (hex: string) =>
  `${parseInt(hex.slice(3, 5), 16)} ${parseInt(hex.slice(5, 7), 16)} ${parseInt(
    hex.slice(7, 9),
    16
  )}`;

const tones = [0, 10, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100];

const ColorSchemeContext = createContext<
  { source: number; setSource: (newSource: number) => void } | undefined
>(undefined);

export function ColorSchemeProvider({ children }: PropsWithChildren) {
  const [source, setSource] = useState(0xff009688);
  const contextVal = useMemo(
    () => ({ source, setSource }),
    [source, setSource]
  );
  const theme = useMemo(() => themeFromSourceColor(source), [source]);

  const styles = useMemo(
    () => css`
      :root {
        ${(Object.keys(theme.palettes) as Array<keyof Theme["palettes"]>)
          .map((key) => {
            const palette = theme.palettes[key];
            return tones.reduce<string>((acc, tone) => {
              const kebabed = kebabCase(key);
              const color = argbToHex(palette.tone(tone));
              return (
                acc +
                css`
                --md-ref-palette-${kebabed}${tone}: ${color};
                --md-ref-palette-${kebabed}${tone}-channel: ${hexToChannel(
                  color
                )};
                `
              );
            }, "");
          })
          .join("\n")}
      }
    `,
    [theme]
  );

  return (
    <ColorSchemeContext.Provider value={contextVal}>
      <style>{styles}</style>
      {children}
    </ColorSchemeContext.Provider>
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

export function ColorPicker() {
  const { source, setSource } = useSafeContext(ColorSchemeContext);
  return (
    <input
      type="color"
      value={argbToHex(source).slice(0, -2)}
      onChange={(e) => setSource(hexToArgb(e.target.value))}
    />
  );
}
