import type { CSSObject } from "@mui/material";
import {
  experimental_extendTheme as extendTheme,
  formControlClasses,
  formHelperTextClasses,
  inputAdornmentClasses,
  inputLabelClasses,
  outlinedInputClasses,
} from "@mui/material";

export const palette = (color: string, tone: number) =>
  `var(--md-ref-palette-${color}${tone})`;

export const color = (color: string) => `var(--md-sys-color-${color})`;

export type TypographyStyle =
  | "label"
  | "body"
  | "title"
  | "headline"
  | "display";

export type TypographySize = "small" | "medium" | "large";

export const typography = (style: TypographyStyle, size: TypographySize) =>
  ({
    fontFamily: `var(--md-sys-typescale-${style}-${size}-font-family-name)`,
    fontStyle: `var(--md-sys-typescale-${style}-${size}-font-family-style)`,
    fontWeight: `var(--md-sys-typescale-${style}-${size}-font-weight)`,
    fontSize: `var(--md-sys-typescale-${style}-${size}-font-size)`,
    letterSpacing: `var(--md-sys-typescale-${style}-${size}-tracking)`,
    lineHeight: `var(--md-sys-typescale-${style}-${size}-line-height)`,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    textTransform:
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      `var(--md-sys-typescale-${style}-${size}-text-transform)` as any,
    textDecoration: `var(--md-sys-typescale-${style}-${size}-text-decoration)`,
  }) satisfies CSSObject;

export const theme = extendTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: color("surface"),
          color: color("on-surface"),
          boxShadow: "var(--elevation-2)",
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          zIndex: 4,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "var(--md-sys-shape-extra-small)",
          color: color("on-surface-variant"),
          ...typography("body", "large"),
          caretColor: color("primary"),
          "&:hover": {
            color: color("on-surface"),
            ["." + outlinedInputClasses.notchedOutline]: {
              borderColor: color("on-surface"),
            },
            ["&." + outlinedInputClasses.error]: {
              color: color("on-error-container"),
              ["." + outlinedInputClasses.notchedOutline]: {
                borderColor: color("on-error-container"),
              },
              ["." + inputAdornmentClasses.positionEnd]: {
                color: color("on-error-container"),
              },
            },
          },
          ["&." + outlinedInputClasses.focused]: {
            color: color("on-surface"),
            ["." + outlinedInputClasses.notchedOutline]: {
              borderColor: color("primary"),
            },
          },
          ["&." + outlinedInputClasses.error]: {
            color: color("on-surface"),
            ["." + outlinedInputClasses.notchedOutline]: {
              borderColor: color("error"),
            },
            ["." + inputAdornmentClasses.positionEnd]: {
              color: color("error"),
            },
          },
        },
        notchedOutline: {
          borderColor: color("outline"),
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: color("on-surface-variant"),
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          ...typography("body", "large"),
          color: color("on-surface-variant"),
          ["&." + inputLabelClasses.focused]: {
            color: color("primary"),
          },
          ["&." + inputLabelClasses.error]: {
            color: color("error"),
            ["." + formControlClasses.root + ":hover &"]: {
              color: color("on-error-container"),
            },
          },
        },
        shrink: {
          ...typography("body", "small"),
          transform: "translate(14px, -9px)",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          ...typography("body", "small"),
          color: color("on-surface-variant"),
          ["&." + formHelperTextClasses.error]: {
            color: color("error"),
          },
        },
      },
    },
  },
});

export default theme;
