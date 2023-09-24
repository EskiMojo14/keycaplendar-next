"use client";
import { ButtonBase } from "@mui/material";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import clsx from "clsx";
import styles from "./index.module.scss";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  icon?: ReactNode;
  classes?: Partial<Record<"icon" | "label", string>>;
  variant?: "elevated" | "filled" | "filled-tonal" | "outlined" | "text";
  dragged?: boolean;
}

export default forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, icon, className, classes, variant = "text", dragged, ...props },
  ref,
) {
  return (
    <ButtonBase
      {...props}
      ref={ref}
      className={clsx(
        styles.button,
        styles[variant],
        dragged && styles.dragged,
        className,
      )}
      TouchRippleProps={{
        className: styles.ripple,
      }}
    >
      {icon && (
        <span
          className={clsx(
            styles.icon,
            "material-symbols-rounded",
            classes?.icon,
          )}
        >
          {icon}
        </span>
      )}
      <span className={clsx(styles.label, classes?.label)}>{children}</span>
    </ButtonBase>
  );
});
