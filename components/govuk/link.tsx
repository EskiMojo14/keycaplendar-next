"use client";
import type { LinkProps as NextLinkProps } from "next/link";
import NextLink from "next/link";
import type { ForwardedRef } from "react";
import { govukBem } from ".";
import { forwardGenericRef } from "@/logic/lib/react";

const linkClasses = govukBem("link");

export interface LinkProps<T> extends NextLinkProps<T> {
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

export interface BackLinkProps<T> extends NextLinkProps<T> {
  color?: "inverse";
}

export const BackLink = forwardGenericRef(function BackLink<T>(
  { className, color, ...props }: BackLinkProps<T>,
  ref: ForwardedRef<HTMLAnchorElement>,
) {
  return (
    <NextLink
      {...props}
      ref={ref}
      className={backLinkClasses({
        modifiers: { [color ?? ""]: true },
        extra: [className ?? ""],
      })}
    >
      Back
    </NextLink>
  );
});
