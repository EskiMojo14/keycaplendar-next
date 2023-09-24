"use client";
import {
  forwardRef,
  useRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import styles from "./index.module.scss";
import clsx from "clsx";
import { useForkRef } from "@mui/material";

interface AppBarProps extends ComponentPropsWithoutRef<"nav"> {
  classes?: Partial<
    Record<"content" | "leadingIcon" | "trailingIcons", string>
  >;
  leadingIcon?: ReactNode;
  trailingIcons?: ReactNode;
}

export default forwardRef<HTMLElement, AppBarProps>(function AppBar(
  { leadingIcon, trailingIcons, className, children, classes, ...props },
  ref,
) {
  const navRef = useRef<HTMLElement>(null);
  const finalRef = useForkRef(ref, navRef);
  return (
    <nav
      {...props}
      ref={finalRef}
      className={clsx(styles.appBar, styles.scrolled, className)}
    >
      {leadingIcon && (
        <div className={clsx(styles.leadingIcon, classes?.leadingIcon)}>
          {leadingIcon}
        </div>
      )}
      <div className={clsx(styles.content, classes?.content)}>{children}</div>
      {trailingIcons && (
        <div className={clsx(styles.trailingIcons, classes?.trailingIcons)}>
          {trailingIcons}
        </div>
      )}
    </nav>
  );
});
