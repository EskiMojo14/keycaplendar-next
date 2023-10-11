import type { LinkProps } from "next/link";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ForwardedRef } from "react";
import { forwardRef } from "react";
import { govukBem } from "..";
import { WidthContainer } from "../grid";
import { forwardGenericRef } from "@/logic/lib/react";

export const headerClasses = govukBem("header");

interface HeaderProps extends ComponentPropsWithoutRef<"header"> {
  fullWidth?: boolean;
  app?: boolean;
}

export default forwardRef<HTMLElement, HeaderProps>(function Header(
  { className, children, fullWidth = false, app = false, ...props },
  ref,
) {
  return (
    <header
      role="banner"
      {...props}
      ref={ref}
      className={headerClasses({ modifiers: { app }, extra: className })}
    >
      <WidthContainer
        className={headerClasses("container", { "full-width": fullWidth })}
      >
        {children}
      </WidthContainer>
    </header>
  );
});

export const HeaderLogo = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(function HeaderLogo({ className, ...props }, ref) {
  return (
    <div
      {...props}
      ref={ref}
      className={headerClasses("logo", undefined, className)}
    />
  );
});

export interface HeaderLinkProps<T> extends LinkProps<T> {
  homepage?: boolean;
}

export const HeaderLink = forwardGenericRef(function HeaderLink<T>(
  { className, homepage = false, ...props }: HeaderLinkProps<T>,
  ref: ForwardedRef<HTMLAnchorElement>,
) {
  return (
    <Link
      {...props}
      ref={ref}
      className={headerClasses("link", { homepage }, className)}
    />
  );
});

export const HeaderLogotype = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(function HeaderLogotype({ className, children, ...props }, ref) {
  return (
    <div
      {...props}
      ref={ref}
      className={headerClasses("logotype", undefined, className)}
    >
      <span className={headerClasses("logotype-text")}>{children}</span>
    </div>
  );
});

export const HeaderContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(function HeaderContent({ className, ...props }, ref) {
  return (
    <div
      {...props}
      ref={ref}
      className={headerClasses("content", undefined, className)}
    />
  );
});

export const HeaderService = forwardGenericRef(function HeaderService<T>(
  { className, ...props }: LinkProps<T>,
  ref: ForwardedRef<HTMLAnchorElement>,
) {
  return (
    <HeaderLink
      {...props}
      ref={ref}
      className={headerClasses("service-name", undefined, className)}
    />
  );
});
