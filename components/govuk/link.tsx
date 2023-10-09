import type { LinkProps as NextLinkProps } from "next/link";
import NextLink from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import { govukBem } from ".";

const linkClasses = govukBem("link");

interface LinkProps
  extends NextLinkProps,
    Omit<ComponentPropsWithoutRef<"a">, keyof NextLinkProps> {
  noVisitedState?: boolean;
  color?: "inverse";
  noUnderline?: boolean;
}

export default forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { className, noUnderline = false, noVisitedState = false, color, ...props },
  ref,
) {
  return (
    <NextLink
      ref={ref}
      {...props}
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

export interface BacklinkProps
  extends NextLinkProps,
    Omit<ComponentPropsWithoutRef<"a">, keyof NextLinkProps> {
  color?: "inverse";
}

export const BackLink = forwardRef<HTMLAnchorElement, BacklinkProps>(
  function BackLink({ className, color, ...props }, ref) {
    return (
      <NextLink
        ref={ref}
        {...props}
        className={backLinkClasses({
          modifiers: { [color ?? ""]: true },
          extra: className,
        })}
      />
    );
  },
);
