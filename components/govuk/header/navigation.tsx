"use client";
import type { LinkProps } from "next/link";
import type { ComponentPropsWithoutRef, ForwardedRef } from "react";
import { forwardRef, useReducer } from "react";
import { HeaderLink, headerClasses } from ".";
import { useActiveLink } from "@/logic/hooks/use-active-link";
import { useIsMounted } from "@/logic/hooks/use-is-mounted";
import { useMediaQuery } from "@/logic/hooks/use-media-query";
import { forwardGenericRef } from "@/logic/lib/react";

export default forwardRef<HTMLElement, ComponentPropsWithoutRef<"nav">>(
  function Navigation({ className, children, ...props }, ref) {
    const [navExpanded, toggleNav] = useReducer((b) => !b, false);
    const largeScreen = useMediaQuery("(min-width: 48.0625em)");
    const mounted = useIsMounted();
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
          hidden={!mounted || largeScreen}
          aria-expanded={navExpanded}
          onClick={toggleNav}
        >
          Menu
        </button>
        <ul
          id="navigation"
          className={headerClasses("navigation-list")}
          hidden={mounted && !largeScreen && !navExpanded}
        >
          {children}
        </ul>
      </nav>
    );
  },
);

export const NavigationItem = forwardGenericRef(function NavigationItem<T>(
  { className, ...props }: LinkProps<T>,
  ref: ForwardedRef<HTMLAnchorElement>,
) {
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
      <HeaderLink {...props} ref={ref} />
    </li>
  );
});
