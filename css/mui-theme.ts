import type { CSSObject, Components, PaletteOptions } from "@mui/material";
import { touchRippleClasses } from "@mui/material/ButtonBase";
import { formControlClasses } from "@mui/material/FormControl";
import { formHelperTextClasses } from "@mui/material/FormHelperText";
import { iconButtonClasses } from "@mui/material/IconButton";
import { inputAdornmentClasses } from "@mui/material/InputAdornment";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import type { Variant } from "@mui/material/styles/createTypography";
import { capitalize } from "@mui/material/utils";
import type {
  CssVarsThemeOptions,
  MD3Palettes,
  MD3Typescale,
  SxProps,
  Theme,
  TypescaleValue,
} from "@mui/material-next";
import type { StrictModifiers } from "@popperjs/core";
import camelCase from "lodash/camelCase";
import { safeDeepAssign, type RemoveIndexSignature } from "@/logic/lib/utils";

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

declare module "@mui/material/IconButton" {
  export interface IconButtonPropsColorOverrides {
    tertiary: true;
  }

  export type IconButtonVariant =
    | "filled"
    | "filledTonal"
    | "outlined"
    | "standard";

  export interface IconButtonOwnProps {
    variant?: IconButtonVariant;
    selected?: boolean;
  }
}

const sizes = [
  "small",
  "medium",
  "mediumProminent",
  "large",
  "largeProminent",
] satisfies Array<keyof TypescaleValue>;

const typescales = ["display", "headline", "title", "body", "label"] as const;

export type TypographyVariant = {
  [Typescale in keyof MD3Typescale]: {
    [Size in keyof TypescaleValue as `${string}Prominent` extends Size
      ? "label" extends Typescale
        ? Size
        : never
      : Size]-?: `${Typescale}${Capitalize<Size>}`;
  }[keyof TypescaleValue];
}[keyof MD3Typescale];

declare module "@mui/material/Typography" {
  export interface TypographyPropsVariantOverrides
    extends Record<TypographyVariant, true>,
      Record<Variant, false> {}
}

export const typescaleTheme: CssVarsThemeOptions = {
  sys: {
    typescale: {
      display: {
        large: {
          family: "var(--md-ref-typeface-brand)",
          weight: "500",
          size: 57,
          tracking: -0.025,
          lineHeight: 64,
        },
        medium: {
          family: "var(--md-ref-typeface-brand)",
          weight: "500",
          size: 45,
          tracking: 0,
          lineHeight: 52,
        },
        small: {
          family: "var(--md-ref-typeface-brand)",
          weight: "500",
          size: 36,
          tracking: 0,
          lineHeight: 44,
        },
      },
      headline: {
        large: {
          family: "var(--md-ref-typeface-brand)",
          weight: "500",
          size: 32,
          tracking: 0,
          lineHeight: 40,
        },
        medium: {
          family: "var(--md-ref-typeface-brand)",
          weight: "500",
          size: 28,
          tracking: 0,
          lineHeight: 36,
        },
        small: {
          family: "var(--md-ref-typeface-brand)",
          weight: "500",
          size: 24,
          tracking: 0,
          lineHeight: 32,
        },
      },
      title: {
        large: {
          family: "var(--md-ref-typeface-brand)",
          weight: "500",
          size: 22,
          tracking: 0,
          lineHeight: 28,
        },
        medium: {
          family: "var(--md-ref-typeface-brand)",
          weight: "600",
          size: 16,
          tracking: 0.15,
          lineHeight: 24,
        },
        small: {
          family: "var(--md-ref-typeface-brand)",
          weight: "600",
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

const onColorMap = {
  primary: "onPrimary",
  secondary: "onSecondary",
  tertiary: "onTertiary",
  neutral: "onNeutral",
  neutralVariant: "onNeutralVariant",
  error: "onError",
  info: "onInfo",
  warning: "onWarning",
  success: "onSuccess",
} satisfies {
  [K in keyof MD3Palettes as "common" extends K
    ? never
    : K]: `on${Capitalize<K>}`;
};

export const componentsTheme: { components?: Components<Theme> } = {
  components: {
    MuiIcon: {
      defaultProps: {
        baseClassName: "material-symbols-rounded",
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme, ownerState }) => {
          let color = ownerState.color ?? "default";
          if (color === "inherit") return;
          if (color === "default") {
            color = "primary";
          }
          const final: CSSObject = {
            transition: theme.transitions.create(
              ["color", "background-color"],
              {
                duration: theme.vars.sys.motion.duration.short3,
                easing: theme.vars.sys.motion.easing.standard,
              },
            ),
          };
          const common = ({
            color,
            backgroundColor,
          }: {
            color: string;
            backgroundColor?: string;
          }) =>
            ({
              color,
              ...(backgroundColor && { backgroundColor }),
              [`.${touchRippleClasses.root}::after`]: {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: color,
                opacity: 0,
                transition: `opacity 150ms ${theme.vars.sys.motion.easing.standard}`,
              },
              "&:hover": {
                backgroundColor: backgroundColor ?? "transparent",
                [`.${touchRippleClasses.root}::after`]: {
                  opacity: theme.vars.sys.state.hover.stateLayerOpacity,
                },
              },
            }) satisfies SxProps;

          const colorContainer =
            color !== "info" && color !== "warning" && color !== "success"
              ? (`${color}Container` as const)
              : "secondaryContainer";
          const onColorContainer =
            color !== "info" && color !== "warning" && color !== "success"
              ? (`on${
                  capitalize(color) as Capitalize<typeof color>
                }Container` as const)
              : "onSecondaryContainer";

          switch (ownerState.variant) {
            case "filled": {
              safeDeepAssign(final, {
                ["&." + iconButtonClasses.disabled]: {
                  backgroundColor: `rgb(${theme.vars.sys.color.onSurfaceChannel} / 0.12)`,
                  color: `rgb(${theme.vars.sys.color.onSurfaceChannel} / 0.38)`,
                },
              });
              switch (ownerState.selected) {
                case true: {
                  safeDeepAssign(
                    final,
                    common({
                      color: theme.vars.sys.color[onColorMap[color]],
                      backgroundColor: theme.vars.sys.color[color],
                    }),
                  );
                  break;
                }
                case false: {
                  safeDeepAssign(
                    final,
                    common({
                      color: theme.vars.sys.color[color],
                      backgroundColor:
                        theme.vars.sys.color.surfaceContainerHighest,
                    }),
                  );
                  break;
                }
                default: {
                  safeDeepAssign(
                    final,
                    common({
                      color: theme.vars.sys.color[onColorMap[color]],
                      backgroundColor: theme.vars.sys.color[color],
                    }),
                  );
                }
              }
              break;
            }
            case "filledTonal": {
              safeDeepAssign(final, {
                ["&." + iconButtonClasses.disabled]: {
                  backgroundColor: `rgb(${theme.vars.sys.color.onSurfaceChannel} / 0.12)`,
                  color: `rgb(${theme.vars.sys.color.onSurfaceChannel} / 0.38)`,
                },
              });
              switch (ownerState.selected) {
                case true: {
                  safeDeepAssign(
                    final,
                    common({
                      color: theme.vars.sys.color[colorContainer],
                      backgroundColor: theme.vars.sys.color[onColorContainer],
                    }),
                  );
                  break;
                }
                case false: {
                  safeDeepAssign(
                    final,
                    common({
                      color: theme.vars.sys.color.onSurfaceVariant,
                      backgroundColor:
                        theme.vars.sys.color.surfaceContainerHighest,
                    }),
                  );
                  break;
                }
                default: {
                  safeDeepAssign(
                    final,
                    common({
                      color: theme.vars.sys.color[colorContainer],
                      backgroundColor: theme.vars.sys.color[onColorContainer],
                    }),
                  );
                }
              }
              break;
            }
            case "outlined": {
              safeDeepAssign(final, {
                ["&." + iconButtonClasses.disabled]: {
                  backgroundColor: `rgb(${theme.vars.sys.color.onSurfaceChannel} / 0.12)`,
                  color: `rgb(${theme.vars.sys.color.onSurfaceChannel} / 0.38)`,
                },
              });
              switch (ownerState.selected) {
                case true: {
                  safeDeepAssign(
                    final,
                    common({
                      color: theme.vars.sys.color.inverseOnSurface,
                      backgroundColor: theme.vars.sys.color.inverseSurface,
                    }),
                  );
                  break;
                }
                default: {
                  safeDeepAssign(final, {
                    border: `1px solid ${theme.vars.sys.color.outline}`,
                    ...common({
                      color: theme.vars.sys.color.onSurfaceVariant,
                    }),
                  });
                }
              }
              break;
            }
            default: {
              safeDeepAssign(final, {
                ["&." + iconButtonClasses.disabled]: {
                  color: `rgb(${theme.vars.sys.color.onSurfaceChannel} / 0.38)`,
                },
              });
              safeDeepAssign(
                final,
                ownerState.selected
                  ? common({ color: theme.vars.sys.color[color] })
                  : common({ color: theme.vars.sys.color.onSurfaceVariant }),
              );
            }
          }
          return final;
        },
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
          borderRadius: theme.vars.sys.shape.corner.small,
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
    MuiTabs: {
      styleOverrides: {
        indicator: ({ theme }) => ({
          backgroundColor: theme.vars.sys.color.primary,
        }),
      },
    },
    MuiTypography: {
      variants: typescales
        .flatMap((typescale) =>
          sizes.map((size) => {
            const prominent = size.includes("Prominent");
            return (prominent && typescale === "label") || !prominent
              ? {
                  props: {
                    variant: camelCase(
                      `${typescale}-${size}`,
                    ) as TypographyVariant,
                  },
                  style: typography(typescale, size),
                }
              : undefined;
          }),
        )
        .filter(Boolean),
    },
    MuiTooltip: {
      defaultProps: {
        placement: "top",
        PopperProps: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -8],
              },
            },
          ] satisfies Array<StrictModifiers>,
        },
      },
      styleOverrides: {
        tooltip: ({ theme }) => ({
          backgroundColor: theme.vars.sys.color.inverseSurface,
          color: theme.vars.sys.color.inverseOnSurface,
          ...typography("body", "small"),
          minHeight: 24,
          display: "flex",
          alignItems: "center",
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderColor: theme.vars.sys.color.outline,
          color: theme.vars.sys.color.onSurface,
        }),
      },
    },
  },
};

export default componentsTheme;
