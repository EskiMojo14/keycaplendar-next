import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { forwardRef } from "react";
import { govukBem } from ".";

const warningTextClasses = govukBem("warning-text");

interface WarningTextProps extends ComponentPropsWithoutRef<"div"> {
  assistiveText?: ReactNode;
}

export default forwardRef<HTMLDivElement, WarningTextProps>(
  function WarningText(
    { className, assistiveText = "Warning", children, ...props },
    ref,
  ) {
    return (
      <div
        ref={ref}
        {...props}
        className={warningTextClasses({ extra: className })}
      >
        <span className={warningTextClasses("icon")} aria-hidden="true">
          !
        </span>
        <strong className={warningTextClasses("text")}>
          <span className={warningTextClasses("assistive")}>
            {assistiveText}
          </span>
          {children}
        </strong>
      </div>
    );
  },
);
