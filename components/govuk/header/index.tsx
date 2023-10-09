import type { LinkProps } from "next/link";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import { govukBem } from "..";
import { WidthContainer } from "../grid";

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
      ref={ref}
      role="banner"
      {...props}
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
      ref={ref}
      {...props}
      className={headerClasses("logo", undefined, className)}
    />
  );
});

export interface HeaderLinkProps
  extends Omit<ComponentPropsWithoutRef<"a">, keyof LinkProps>,
    LinkProps {
  homepage?: boolean;
}

export const HeaderLink = forwardRef<HTMLAnchorElement, HeaderLinkProps>(
  function HeaderLink({ className, homepage = false, ...props }, ref) {
    return (
      <Link
        ref={ref}
        {...props}
        className={headerClasses("link", { homepage }, className)}
      />
    );
  },
);

export const HeaderLogotype = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(function HeaderLogotype({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      {...props}
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
      ref={ref}
      {...props}
      className={headerClasses("content", undefined, className)}
    />
  );
});

export const HeaderService = forwardRef<
  HTMLAnchorElement,
  Omit<ComponentPropsWithoutRef<"a">, keyof LinkProps> & LinkProps
>(function HeaderService({ className, ...props }, ref) {
  return (
    <HeaderLink
      ref={ref}
      {...props}
      className={headerClasses("service-name", undefined, className)}
    />
  );
});
