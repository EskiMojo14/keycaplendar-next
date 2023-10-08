import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import { govukBem } from ".";

const errorMessageClasses = govukBem("error-message");

export default forwardRef<HTMLParagraphElement, ComponentPropsWithoutRef<"p">>(
  function ErrorMessage({ className, children, ...props }, ref) {
    return (
      <p
        ref={ref}
        {...props}
        className={errorMessageClasses({ extra: className })}
      >
        <span className="govuk-visually-hidden">Error:</span>
        {children}
      </p>
    );
  },
);
