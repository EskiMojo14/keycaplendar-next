"use client";
import type { LinkProps as NextLinkProps } from "next/link";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ForwardedRef,
} from "react";
import styles from "./link.module.scss";
import { govukBem } from ".";
import { forwardGenericRef } from "@/logic/lib/react";

const linkClasses = govukBem("link");

interface LinkProps<T> extends NextLinkProps<T> {
  noVisitedState?: boolean;
  color?: "inverse";
  noUnderline?: boolean;
}

export default forwardGenericRef(function Link<T>(
  {
    className,
    noUnderline = false,
    noVisitedState = false,
    color,
    ...props
  }: LinkProps<T>,
  ref: ForwardedRef<HTMLAnchorElement>,
) {
  return (
    <NextLink
      {...props}
      ref={ref}
      className={linkClasses({
        modifiers: {
          "no-underline": noUnderline,
          "no-visited-state": noVisitedState,
          [color ?? ""]: true,
        },
        extra: className,
      })}
    />
  );
});

const backLinkClasses = govukBem("back-link");

export interface BacklinkProps extends ComponentPropsWithoutRef<"button"> {
  color?: "inverse";
}

export const BackLink = forwardRef(function BackLink(
  { className, color, onClick, ...props }: BacklinkProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const router = useRouter();
  return (
    <button
      {...props}
      ref={ref}
      className={backLinkClasses({
        modifiers: { [color ?? ""]: true },
        extra: [className ?? "", styles.backLink ?? ""],
      })}
      onClick={(e) => {
        router.back();
        onClick?.(e);
      }}
    >
      Back
    </button>
  );
});
