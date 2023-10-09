import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import { govukBem } from ".";

const formGroupClasses = govukBem("form-group");

export interface FormGroupProps extends ComponentPropsWithoutRef<"div"> {
  error?: boolean;
}

export default forwardRef<HTMLDivElement, FormGroupProps>(function FormGroup(
  { className, error = false, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      {...props}
      className={formGroupClasses({
        modifiers: { error },
        extra: className,
      })}
    />
  );
});
