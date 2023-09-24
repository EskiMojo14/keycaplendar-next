"use client";
import { ButtonBase } from "@mui/material";
import type { MouseEventHandler, ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import styles from "./index.module.scss";
import clsx from "clsx";

interface IconButtonProps
  extends Omit<ComponentPropsWithoutRef<"button">, "onClick"> {
  classes?: Partial<Record<"container" | "icon", string>>;
  variant?: "filled" | "filled-tonal" | "outlined" | "standard";
  onClick?: MouseEventHandler<HTMLSpanElement>;
  selected?: boolean;
}

export default forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      variant = "standard",
      children,
      className,
      classes,
      onClick,
      disabled,
      selected,
      ...props
    },
    ref,
  ) {
    return (
      <span
        onClick={disabled ? undefined : onClick}
        className={clsx(styles.iconButtonContainer, classes?.container)}
      >
        <ButtonBase
          {...props}
          centerRipple
          ref={ref}
          disabled={disabled}
          className={clsx(
            styles.iconButton,
            styles[variant],
            selected && styles.selected,
            selected === false && styles.unselected,
            className,
          )}
          TouchRippleProps={{
            className: styles.ripple,
          }}
        >
          <i
            className={clsx(
              styles.icon,
              classes?.icon ?? "material-symbols-rounded",
            )}
          >
            {children}
          </i>
        </ButtonBase>
      </span>
    );
  },
);
