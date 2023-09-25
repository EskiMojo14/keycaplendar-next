"use client";
import type { PropsWithChildren } from "react";
import { useState, useMemo, createContext, useRef } from "react";
import type { Mode } from "@mui/system/cssVars/useCurrentColorScheme";
import Popover from "@mui/material/Popover";
import { useIsMounted } from "@/logic/hooks/use-is-mounted";
import type { Theme, TonalPalette } from "@material/material-color-utilities";
import { themeFromSourceColor } from "@material/material-color-utilities";
import { useSafeContext } from "@/logic/hooks/use-safe-context";
import { HexColorPicker } from "react-colorful";
import styles from "./color-scheme.module.scss";
import IconButton from "./md/icon-button";
import type {
  MD3NeutralTones,
  MD3Palettes,
  MD3Tones,
} from "@mui/material-next";
import {
  extendTheme,
  CssVarsProvider,
  getInitColorSchemeScript,
  useColorScheme,
} from "@mui/material-next";
import { debugPalette, componentsTheme, typescaleTheme } from "@/css/mui-theme";

declare module "@mui/material-next/styles/Theme.types" {
  export interface MD3NeutralTones {
    12: string;
    94: string;
  }
  export interface MD3ColorSchemeTokens {
    surfaceContainer: string;
  }
}

declare module "@mui/material/styles/createMixins" {
  export interface Mixins {
    theme: Theme;
    tone: (palette: keyof Theme["palettes"], tone: number) => string;
  }
}

export function InitColorScheme() {
  return getInitColorSchemeScript();
}

const argbToHex = (n: number) => {
  const argb = n.toString(16);
  return "#" + argb.slice(2, 8);
};

const hexToArgb = (hex: string) => parseInt("ff" + hex.slice(1), 16);

const ColorSchemeContext = createContext<
  { source: number; setSource: (newSource: number) => void } | undefined
>(undefined);

const getMD3Tones = (palette: TonalPalette): MD3Tones => ({
  0: argbToHex(palette.tone(0)),
  10: argbToHex(palette.tone(10)),
  20: argbToHex(palette.tone(20)),
  30: argbToHex(palette.tone(30)),
  40: argbToHex(palette.tone(40)),
  50: argbToHex(palette.tone(50)),
  60: argbToHex(palette.tone(60)),
  70: argbToHex(palette.tone(70)),
  80: argbToHex(palette.tone(80)),
  90: argbToHex(palette.tone(90)),
  95: argbToHex(palette.tone(95)),
  99: argbToHex(palette.tone(99)),
  100: argbToHex(palette.tone(100)),
});

const getNeutralMD3Tones = (palette: TonalPalette): MD3NeutralTones => ({
  ...getMD3Tones(palette),
  12: argbToHex(palette.tone(12)),
  17: argbToHex(palette.tone(17)),
  22: argbToHex(palette.tone(22)),
  92: argbToHex(palette.tone(92)),
  94: argbToHex(palette.tone(94)),
});

const sansSerifStack = "Lato, Roboto, system-ui, sans-serif";
const slabSerifStack =
  "Rockwell, 'Rockwell Nova', 'Roboto Slab', 'DejaVu Serif', 'Sitka Small', serif";

export function ColorSchemeProvider({ children }: PropsWithChildren) {
  const [source, setSource] = useState(0xff009688);
  const contextVal = useMemo(
    () => ({ source, setSource }),
    [source, setSource],
  );
  const theme = useMemo(() => themeFromSourceColor(source), [source]);
  const muiTheme = useMemo(() => {
    const palettes: Partial<MD3Palettes> = {
      primary: getMD3Tones(theme.palettes.primary),
      secondary: getMD3Tones(theme.palettes.secondary),
      tertiary: getMD3Tones(theme.palettes.tertiary),
      error: getMD3Tones(theme.palettes.error),
      neutral: getNeutralMD3Tones(theme.palettes.neutral),
      neutralVariant: getMD3Tones(theme.palettes.neutralVariant),
    };
    return extendTheme(
      {
        ...debugPalette,
        colorSchemes: {
          light: {
            ref: { palette: palettes },
            sys: {
              color: { surfaceContainer: "var(--md-ref-palette-neutral-94)" },
            },
          },
          dark: {
            ref: { palette: palettes },
            sys: {
              color: { surfaceContainer: "var(--md-ref-palette-neutral-12)" },
            },
          },
        },
        ref: {
          typeface: {
            plain: sansSerifStack,
            brand: slabSerifStack,
          },
        },
        mixins: {
          theme,
          tone: (palette, tone) =>
            argbToHex(theme.palettes[palette].tone(tone)),
        },
      },
      typescaleTheme,
      componentsTheme,
    );
  }, [theme]);

  return (
    <ColorSchemeContext.Provider value={contextVal}>
      <CssVarsProvider theme={muiTheme} defaultMode="system">
        {children}
      </CssVarsProvider>
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
      onClick={(e) => {
        setMode(e.ctrlKey ? "system" : mode === "dark" ? "light" : "dark");
      }}
    >
      {icons[mode]}
    </IconButton>
  );
}

export function ColorPicker() {
  const { source, setSource } = useSafeContext(ColorSchemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const anchorEl = useRef<HTMLButtonElement>(null);
  return (
    <>
      <IconButton
        ref={anchorEl}
        onClick={() => {
          setMenuOpen(true);
        }}
      >
        palette
      </IconButton>
      <Popover
        anchorEl={anchorEl.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={menuOpen}
        onClose={() => {
          setMenuOpen(false);
        }}
        classes={{
          paper: styles.pickerSurface,
        }}
      >
        <HexColorPicker
          className={styles.picker}
          color={argbToHex(source)}
          onChange={(hex) => {
            setSource(hexToArgb(hex));
          }}
        />
      </Popover>
    </>
  );
}
