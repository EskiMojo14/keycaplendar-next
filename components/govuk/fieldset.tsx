import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import { govukBem } from ".";

const fieldsetClasses = govukBem("fieldset");

export default forwardRef<
  HTMLFieldSetElement,
  ComponentPropsWithoutRef<"fieldset">
>(function Fieldset({ className, ...props }, ref) {
  return (
    <fieldset
      ref={ref}
      {...props}
      className={fieldsetClasses({ extra: className })}
    />
  );
});

interface FieldsetLegendProps extends ComponentPropsWithoutRef<"legend"> {
  size?: "xl" | "l" | "m" | "s";
}

export const FieldsetLegend = forwardRef<
  HTMLLegendElement,
  FieldsetLegendProps
>(function FieldsetLegend({ className, size, ...props }, ref) {
  return (
    <legend
      ref={ref}
      {...props}
      className={fieldsetClasses("legend", [size ?? ""], className)}
    />
  );
});

export const FieldsetHeading = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithoutRef<"h1">
>(function FieldsetHeading({ className, ...props }, ref) {
  return (
    <h1
      ref={ref}
      {...props}
      className={fieldsetClasses("heading", undefined, className)}
    />
  );
});
