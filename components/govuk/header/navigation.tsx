"use client";
import type { LinkProps } from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef, useReducer } from "react";
import { HeaderLink, headerClasses } from ".";
import { useActiveLink } from "@/logic/hooks/use-active-link";
import { useMediaQuery } from "@/logic/hooks/use-media-query";

export default forwardRef<HTMLElement, ComponentPropsWithoutRef<"nav">>(
  function Navigation({ className, children, ...props }, ref) {
    const [navExpanded, toggleNav] = useReducer((b) => !b, false);
    const collapseNav = !useMediaQuery("(min-width: 48.0625em)");
    return (
      <nav
        ref={ref}
        aria-label="Menu"
        {...props}
        className={headerClasses("navigation", undefined, className)}
      >
        <button
          type="button"
          className={headerClasses(
            "menu-button",
            undefined,
            "govuk-js-header-toggle",
          )}
          aria-controls="navigation"
          aria-label="Show or hide menu"
          hidden={!collapseNav}
          aria-expanded={navExpanded}
          onClick={toggleNav}
        >
          Menu
        </button>
        <ul
          id="navigation"
          className={headerClasses("navigation-list")}
          hidden={collapseNav && !navExpanded}
        >
          {children}
        </ul>
      </nav>
    );
  },
);

export interface NavigationItemProps
  extends Omit<ComponentPropsWithoutRef<"a">, keyof LinkProps>,
    LinkProps {}

export const NavigationItem = forwardRef<
  HTMLAnchorElement,
  NavigationItemProps
>(function NavigationItem({ className, ...props }, ref) {
  const activeClass = useActiveLink(props, {
    activeClass: "govuk-header__navigation-item--active",
    activeSubClass: "",
  });
  return (
    <li
      className={headerClasses("navigation-item", undefined, [
        activeClass,
        className ?? "",
      ])}
    >
      <HeaderLink ref={ref} {...props} />
    </li>
  );
});
