import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import { govukBem } from ".";

const labelClasses = govukBem("label");

export interface LabelProps extends ComponentPropsWithoutRef<"label"> {
  size?: "xl" | "l" | "m" | "s";
}

export default forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { className, size, ...props },
  ref,
) {
  return (
    <label
      ref={ref}
      {...props}
      className={labelClasses({ modifiers: [size ?? ""], extra: className })}
    />
  );
});

const labelWrapperClasses = govukBem("label-wrapper");

export const LabelWrapper = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithoutRef<"h1">
>(function LabelWrapper({ className, ...props }, ref) {
  return (
    <h1
      ref={ref}
      {...props}
      className={labelWrapperClasses({ extra: className })}
    />
  );
});
