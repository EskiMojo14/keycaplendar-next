"use client";
import type { PropsWithChildren } from "react";
import { useState, useMemo, createContext, useRef } from "react";
import type { Mode } from "@mui/system/cssVars/useCurrentColorScheme";
import Popover, { popoverClasses } from "@mui/material/Popover";
import { useIsMounted } from "@/logic/hooks/use-is-mounted";
import type { Theme, TonalPalette } from "@material/material-color-utilities";
import {
  Blend,
  CorePalette,
  argbFromHex,
  hexFromArgb,
  themeFromSourceColor,
} from "@material/material-color-utilities";
import { useSafeContext } from "@/logic/hooks/use-safe-context";
import { HexColorPicker } from "react-colorful";
import styles from "./color-scheme.module.scss";
import IconButton from "@mui/material/IconButton";
import Tabs from "@mui/material-next/Tabs";
import Tab from "@mui/material-next/Tab";
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
} from "@mui/material-next/styles";
import { debugPalette, componentsTheme, typescaleTheme } from "@/css/mui-theme";
import Icon from "@mui/material/Icon";
import * as colors from "@mui/material/colors";
import { castSx } from "@/logic/lib/utils";
import Box from "@mui/material/Box";
import { useLocalStorage } from "@/logic/hooks/use-local-storage";
import type { Options } from "@emotion/cache";
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";

declare module "@mui/material-next/styles/Theme.types" {
  export interface MD3NeutralTones {
    12: string;
    94: string;
  }
  export interface MD3ColorSchemeTokens {
    surfaceContainer: string;
    infoContainer: string;
    onInfoContainer: string;
    warningContainer: string;
    onWarningContainer: string;
    successContainer: string;
    onSuccessContainer: string;
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

const ColorSchemeContext = createContext<
  { source: number; setSource: (newSource: number) => void } | undefined
>(undefined);

const getMD3Tones = (palette: TonalPalette): MD3Tones => ({
  0: hexFromArgb(palette.tone(0)),
  10: hexFromArgb(palette.tone(10)),
  20: hexFromArgb(palette.tone(20)),
  30: hexFromArgb(palette.tone(30)),
  40: hexFromArgb(palette.tone(40)),
  50: hexFromArgb(palette.tone(50)),
  60: hexFromArgb(palette.tone(60)),
  70: hexFromArgb(palette.tone(70)),
  80: hexFromArgb(palette.tone(80)),
  90: hexFromArgb(palette.tone(90)),
  95: hexFromArgb(palette.tone(95)),
  99: hexFromArgb(palette.tone(99)),
  100: hexFromArgb(palette.tone(100)),
});

const getNeutralMD3Tones = (palette: TonalPalette): MD3NeutralTones => ({
  ...getMD3Tones(palette),
  12: hexFromArgb(palette.tone(12)),
  17: hexFromArgb(palette.tone(17)),
  22: hexFromArgb(palette.tone(22)),
  92: hexFromArgb(palette.tone(92)),
  94: hexFromArgb(palette.tone(94)),
});

const sansSerifStack = "Lato, Roboto, system-ui, sans-serif";
const slabSerifStack =
  "Rockwell, 'Rockwell Nova', 'Roboto Slab', 'DejaVu Serif', 'Sitka Small', serif";

const makePalette =
  (color: number, blend = true) =>
  (source: number) => {
    let value = color;
    if (blend) {
      const from = value;
      const to = source;
      value = Blend.harmonize(from, to);
    }
    const palette = CorePalette.of(value);
    return palette.a1;
  };

const errorPalette = makePalette(argbFromHex(colors.red[500]));
const infoPalette = makePalette(argbFromHex(colors.lightBlue[500]));
const successPalette = makePalette(argbFromHex(colors.green[500]));
const warningPalette = makePalette(argbFromHex(colors.orange[500]));

export function ThemeRegistry({
  options,
  children,
}: PropsWithChildren<{ options: Options }>) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const prevInsert = cache.insert;
    let inserted: Array<string> = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: options.prepend ? `@layer emotion {${styles}}` : styles,
        }}
      />
    );
  });
  return <CacheProvider value={cache}>{children}</CacheProvider>;
}

export function ColorSchemeProvider({ children }: PropsWithChildren) {
  const [source, setSource] = useLocalStorage(0xff009688, "theme-source");
  const contextVal = useMemo(
    () => ({ source, setSource }),
    [source, setSource],
  );
  const theme = useMemo(() => themeFromSourceColor(source), [source]);
  const muiTheme = useMemo(() => {
    const palettes = {
      primary: getMD3Tones(theme.palettes.primary),
      secondary: getMD3Tones(theme.palettes.secondary),
      tertiary: getMD3Tones(theme.palettes.tertiary),
      neutral: getNeutralMD3Tones(theme.palettes.neutral),
      neutralVariant: getMD3Tones(theme.palettes.neutralVariant),
      info: getMD3Tones(infoPalette(source)),
      success: getMD3Tones(successPalette(source)),
      warning: getMD3Tones(warningPalette(source)),
      error: getMD3Tones(errorPalette(source)),
    } satisfies Partial<MD3Palettes>;
    return extendTheme(
      {
        ...debugPalette,
        colorSchemes: {
          light: {
            ref: { palette: palettes },
            sys: {
              color: {
                surfaceContainer: "var(--md-ref-palette-neutral-94)",
                infoContainer: "var(--md-ref-palette-info-90)",
                onInfoContainer: "var(--md-ref-palette-info-10)",
                warningContainer: "var(--md-ref-palette-warning-90)",
                onWarningContainer: "var(--md-ref-palette-warning-10)",
                successContainer: "var(--md-ref-palette-success-90)",
                onSuccessContainer: "var(--md-ref-palette-success-10)",
              },
            },
          },
          dark: {
            ref: { palette: palettes },
            sys: {
              color: {
                surfaceContainer: "var(--md-ref-palette-neutral-12)",
                infoContainer: "var(--md-ref-palette-info-30)",
                onInfoContainer: "var(--md-ref-palette-info-90)",
                warningContainer: "var(--md-ref-palette-warning-30)",
                onWarningContainer: "var(--md-ref-palette-warning-90)",
                successContainer: "var(--md-ref-palette-success-30)",
                onSuccessContainer: "var(--md-ref-palette-success-90)",
              },
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
            hexFromArgb(theme.palettes[palette].tone(tone)),
        },
      },
      typescaleTheme,
      componentsTheme,
    );
  }, [theme, source]);

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
        setMode(
          e.ctrlKey || e.metaKey
            ? "system"
            : mode === "dark"
            ? "light"
            : "dark",
        );
      }}
    >
      <Icon>{icons[mode]}</Icon>
    </IconButton>
  );
}

export function ColorDemo() {
  return (
    <div style={{ display: "flex", margin: "auto" }}>
      <Icon
        sx={castSx((theme) => ({
          color: theme.vars.sys.color.onPrimary,
          backgroundColor: theme.vars.sys.color.primary,
        }))}
      >
        circle
      </Icon>
      <Icon
        sx={castSx((theme) => ({
          color: theme.vars.sys.color.onPrimaryContainer,
          backgroundColor: theme.vars.sys.color.primaryContainer,
        }))}
      >
        circle
      </Icon>
      <Icon
        sx={castSx((theme) => ({
          color: theme.vars.sys.color.onSecondary,
          backgroundColor: theme.vars.sys.color.secondary,
        }))}
      >
        circle
      </Icon>
      <Icon
        sx={castSx((theme) => ({
          color: theme.vars.sys.color.onSecondaryContainer,
          backgroundColor: theme.vars.sys.color.secondaryContainer,
        }))}
      >
        circle
      </Icon>
      <Icon
        sx={castSx((theme) => ({
          color: theme.vars.sys.color.onTertiary,
          backgroundColor: theme.vars.sys.color.tertiary,
        }))}
      >
        circle
      </Icon>
      <Icon
        sx={castSx((theme) => ({
          color: theme.vars.sys.color.onTertiaryContainer,
          backgroundColor: theme.vars.sys.color.tertiaryContainer,
        }))}
      >
        circle
      </Icon>
      <Icon
        sx={castSx((theme) => ({
          color: theme.vars.sys.color.onInfo,
          backgroundColor: theme.vars.sys.color.info,
        }))}
      >
        info
      </Icon>
      <Icon
        sx={castSx((theme) => ({
          color: theme.vars.sys.color.onInfoContainer,
          backgroundColor: theme.vars.sys.color.infoContainer,
        }))}
      >
        info
      </Icon>
      <Icon
        sx={castSx((theme) => ({
          color: theme.vars.sys.color.onError,
          backgroundColor: theme.vars.sys.color.error,
        }))}
      >
        error
      </Icon>
      <Icon
        sx={castSx((theme) => ({
          color: theme.vars.sys.color.onErrorContainer,
          backgroundColor: theme.vars.sys.color.errorContainer,
        }))}
      >
        error
      </Icon>
      <Icon
        sx={castSx((theme) => ({
          color: theme.vars.sys.color.onWarning,
          backgroundColor: theme.vars.sys.color.warning,
        }))}
      >
        warning
      </Icon>
      <Icon
        sx={castSx((theme) => ({
          color: theme.vars.sys.color.onWarningContainer,
          backgroundColor: theme.vars.sys.color.warningContainer,
        }))}
      >
        warning
      </Icon>
      <Icon
        sx={castSx((theme) => ({
          color: theme.vars.sys.color.onSuccess,
          backgroundColor: theme.vars.sys.color.success,
        }))}
      >
        check_circle
      </Icon>
      <Icon
        sx={castSx((theme) => ({
          color: theme.vars.sys.color.onSuccessContainer,
          backgroundColor: theme.vars.sys.color.successContainer,
        }))}
      >
        check_circle
      </Icon>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { common, grey, ...rest } = colors;

const defaultColors = Object.values(rest).map((palette) => palette[500]);

export function ColorPicker() {
  const { source, setSource } = useSafeContext(ColorSchemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const anchorEl = useRef<HTMLButtonElement>(null);
  const [tab, setTab] = useState<"palette" | "picker">("palette");
  return (
    <>
      <IconButton
        ref={anchorEl}
        onClick={() => {
          setMenuOpen(true);
        }}
      >
        <Icon>palette</Icon>
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
        sx={castSx((theme) => ({
          ["." + popoverClasses.paper]: {
            borderRadius: theme.sys.shape.corner.medium,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          },
        }))}
      >
        <Tabs
          variant="fullWidth"
          value={tab}
          onChange={(e, v) => {
            setTab(v as typeof tab);
          }}
        >
          <Tab value="palette" icon={<Icon>palette</Icon>} />
          <Tab value="picker" icon={<Icon>colors</Icon>} />
        </Tabs>
        {tab === "palette" && (
          <Box
            display="grid"
            gridTemplateColumns="repeat(6,42px)"
            justifyItems="center"
            justifyContent="space-between"
            alignItems="center"
            gap={2}
            p={2}
          >
            {defaultColors.map((color) => {
              const argb = argbFromHex(color);
              return (
                <IconButton
                  key={color}
                  variant="outlined"
                  onClick={() => {
                    setSource(argb);
                  }}
                  selected={argb === source}
                >
                  <Box
                    sx={{
                      height: 24,
                      width: 24,
                      borderRadius: "50%",
                      backgroundColor: color,
                    }}
                  />
                </IconButton>
              );
            })}
          </Box>
        )}
        {tab === "picker" && (
          <HexColorPicker
            className={styles.picker}
            color={hexFromArgb(source)}
            onChange={(hex) => {
              setSource(argbFromHex(hex));
            }}
          />
        )}
        <ColorDemo />
      </Popover>
    </>
  );
}
