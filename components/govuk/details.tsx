import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { forwardRef } from "react";
import { govukBem } from ".";

const detailsClasses = govukBem("details");

export default forwardRef<
  HTMLDetailsElement,
  ComponentPropsWithoutRef<"details"> & { summary: ReactNode }
>(function Details({ summary, className, children, ...props }, ref) {
  return (
    <details
      ref={ref}
      {...props}
      className={detailsClasses({ extra: className })}
    >
      <summary className={detailsClasses("summary")}>
        <span className={detailsClasses("summary-text")}>{summary}</span>
      </summary>
      <div className={detailsClasses("text")}>{children}</div>
    </details>
  );
});
