import type { RemoveIndexSignature } from "@/logic/lib/utils";
import type { CSSObject, Components, PaletteOptions } from "@mui/material";
import {
  formControlClasses,
  formHelperTextClasses,
  inputAdornmentClasses,
  inputLabelClasses,
  outlinedInputClasses,
} from "@mui/material";
import type {
  CssVarsThemeOptions,
  MD3Typescale,
  Theme,
  TypescaleValue,
} from "@mui/material-next";

declare module "@mui/material-next/styles/Theme.types" {
  export interface TypescaleValue {
    largeProminent?: {
      weight: string;
    };
    mediumProminent?: {
      weight: string;
    };
  }
}

const typescaleToCSS = {
  family: "fontFamily",
  weight: "fontWeight",
  size: "fontSize",
  tracking: "letterSpacing",
  lineHeight: "lineHeight",
} satisfies Record<
  keyof TypescaleValue["small"],
  keyof RemoveIndexSignature<CSSObject>
>;

export const typography = (
  style: keyof MD3Typescale,
  size: keyof TypescaleValue,
) =>
  Object.fromEntries(
    Object.entries(typescaleToCSS).map(([typescale, prop]) => [
      prop,
      typescale === "lineHeight"
        ? `calc(var(--md-sys-typescale-${style}-${size}-${typescale}) / 14)`
        : `var(--md-sys-typescale-${style}-${size}-${typescale})`,
    ]),
  ) as Record<(typeof typescaleToCSS)[keyof typeof typescaleToCSS], string>;

export const debugPalette: { palette: PaletteOptions } = {
  palette: {
    primary: { main: "red" },
    secondary: { main: "green" },
    error: { main: "orange" },
    warning: { main: "teal" },
    background: {
      default: "red",
      paper: "cyan",
    },
  },
};

declare module "@mui/material-next/styles/Theme.types" {
  export interface MD3Typescale {
    title: TypescaleValue;
  }
}

export const typescaleTheme: CssVarsThemeOptions = {
  sys: {
    typescale: {
      display: {
        large: {
          family: "var(--md-ref-typeface-brand)",
          weight: "400",
          size: 57,
          tracking: -0.025,
          lineHeight: 64,
        },
        medium: {
          family: "var(--md-ref-typeface-brand)",
          weight: "400",
          size: 45,
          tracking: 0,
          lineHeight: 52,
        },
        small: {
          family: "var(--md-ref-typeface-brand)",
          weight: "400",
          size: 36,
          tracking: 0,
          lineHeight: 44,
        },
      },
      headline: {
        large: {
          family: "var(--md-ref-typeface-brand)",
          weight: "400",
          size: 32,
          tracking: 0,
          lineHeight: 40,
        },
        medium: {
          family: "var(--md-ref-typeface-brand)",
          weight: "400",
          size: 28,
          tracking: 0,
          lineHeight: 36,
        },
        small: {
          family: "var(--md-ref-typeface-brand)",
          weight: "400",
          size: 24,
          tracking: 0,
          lineHeight: 32,
        },
      },
      title: {
        large: {
          family: "var(--md-ref-typeface-brand)",
          weight: "400",
          size: 22,
          tracking: 0,
          lineHeight: 28,
        },
        medium: {
          family: "var(--md-ref-typeface-brand)",
          weight: "500",
          size: 16,
          tracking: 0.15,
          lineHeight: 24,
        },
        small: {
          family: "var(--md-ref-typeface-brand)",
          weight: "500",
          size: 14,
          tracking: 0.1,
          lineHeight: 20,
        },
      },
      body: {
        large: {
          family: "var(--md-ref-typeface-plain)",
          weight: "400",
          size: 16,
          tracking: 0.5,
          lineHeight: 24,
        },
        medium: {
          family: "var(--md-ref-typeface-plain)",
          weight: "400",
          size: 14,
          tracking: 0.25,
          lineHeight: 20,
        },
        small: {
          family: "var(--md-ref-typeface-plain)",
          weight: "400",
          size: 12,
          tracking: 0.4,
          lineHeight: 16,
        },
      },
      label: {
        large: {
          family: "var(--md-ref-typeface-plain)",
          weight: "500",
          size: 14,
          tracking: 0.1,
          lineHeight: 20,
        },
        medium: {
          family: "var(--md-ref-typeface-plain)",
          weight: "400",
          size: 12,
          tracking: 0.5,
          lineHeight: 16,
        },
        small: {
          family: "var(--md-ref-typeface-plain)",
          weight: "500",
          size: 11,
          tracking: 0.5,
          lineHeight: 16,
        },
        largeProminent: {
          weight: "700",
        },
        mediumProminent: {
          weight: "700",
        },
      },
    } satisfies MD3Typescale,
  },
};

export const componentsTheme: { components?: Components<Theme> } = {
  components: {
    MuiIcon: {
      defaultProps: {
        baseClassName: "material-symbols-rounded",
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.vars.sys.color.surface,
          color: theme.vars.sys.color.onSurface,
          boxShadow: theme.vars.sys.elevation[2],
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.vars.shape.borderRadius,
          color: theme.vars.sys.color.onSurfaceVariant,
          ...typography("body", "large"),
          caretColor: theme.vars.sys.color.primary,
          "&:hover": {
            color: theme.vars.sys.color.onSurface,
            ["." + outlinedInputClasses.notchedOutline]: {
              borderColor: theme.vars.sys.color.onSurface,
            },
            ["&." + outlinedInputClasses.error]: {
              color: theme.vars.sys.color.onErrorContainer,
              ["." + outlinedInputClasses.notchedOutline]: {
                borderColor: theme.vars.sys.color.onErrorContainer,
              },
              ["." + inputAdornmentClasses.positionEnd]: {
                color: theme.vars.sys.color.onErrorContainer,
              },
            },
          },
          ["&." + outlinedInputClasses.focused]: {
            color: theme.vars.sys.color.onSurface,
            ["." + outlinedInputClasses.notchedOutline]: {
              borderColor: theme.vars.sys.color.primary,
            },
          },
          ["&." + outlinedInputClasses.error]: {
            color: theme.vars.sys.color.onSurface,
            ["." + outlinedInputClasses.notchedOutline]: {
              borderColor: theme.vars.sys.color.error,
            },
            ["." + inputAdornmentClasses.positionEnd]: {
              color: theme.vars.sys.color.error,
            },
          },
        }),
        notchedOutline: ({ theme }) => ({
          borderColor: theme.vars.sys.color.outline,
        }),
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.vars.sys.color.onSurfaceVariant,
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...typography("body", "large"),
          color: theme.vars.sys.color.onSurfaceVariant,
          ["&." + inputLabelClasses.focused]: {
            color: theme.vars.sys.color.primary,
          },
          ["&." + inputLabelClasses.error]: {
            color: theme.vars.sys.color.error,
            ["." + formControlClasses.root + ":hover &"]: {
              color: theme.vars.sys.color.onErrorContainer,
            },
          },
        }),
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.vars.sys.color.onSurfaceVariant,
          ["&." + formHelperTextClasses.error]: {
            color: theme.vars.sys.color.error,
          },
        }),
      },
    },
  },
};

export default componentsTheme;
