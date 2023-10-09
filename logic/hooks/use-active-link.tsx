"use client";
import url from "url";
import type { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

export const useActiveLink = (
  { href, as }: Pick<LinkProps, "href" | "as">,
  {
    activeClass,
    activeSubClass,
  }: Record<"activeClass" | "activeSubClass", string>,
) => {
  const pathname = usePathname();
  const sanitizedPath = pathname.split("#")[0]?.split("?")[0];
  // check if the link or a sub-page is active and return the according class name
  // remove trailing slash if present
  if (typeof href === "object") {
    href = url.format(href);
  }
  href = href && href !== "/" && href.endsWith("/") ? href.slice(0, -1) : href;
  if (typeof as === "object") {
    as = url.format(as);
  }
  as = as && as !== "/" && as.endsWith("/") ? as.slice(0, -1) : as;
  const activityClassName =
    sanitizedPath === href || sanitizedPath === as
      ? activeClass
      : // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      sanitizedPath?.startsWith(href + "/") ||
        sanitizedPath?.startsWith(as + "/")
      ? activeSubClass
      : "";
  return activityClassName;
};
