import type { LinkProps } from "next/link";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ForwardedRef } from "react";
import { forwardRef } from "react";
import { govukBem } from ".";
import { forwardGenericRef } from "@/logic/lib/react";

const breadcrumbsClasses = govukBem("breadcrumbs");

interface BreadcrumbsProps extends ComponentPropsWithoutRef<"div"> {
  collapseOnMobile?: boolean;
  color?: "inverse";
}

export default forwardRef<HTMLDivElement, BreadcrumbsProps>(
  function Breadcrumbs(
    { className, children, collapseOnMobile = false, color, ...props },
    ref,
  ) {
    return (
      <div
        ref={ref}
        {...props}
        className={breadcrumbsClasses({
          modifiers: {
            "collapse-on-mobile": collapseOnMobile,
            [color ?? ""]: true,
          },
          extra: className,
        })}
      >
        <ol className={breadcrumbsClasses("list")}>{children}</ol>
      </div>
    );
  },
);

export const Breadcrumb = forwardGenericRef(function Breadcrumb<T>(
  { className, ...props }: LinkProps<T>,
  ref: ForwardedRef<HTMLAnchorElement>,
) {
  return (
    <li className={breadcrumbsClasses("list-item", undefined, className)}>
      <Link ref={ref} {...props} className={breadcrumbsClasses("link")} />
    </li>
  );
});
