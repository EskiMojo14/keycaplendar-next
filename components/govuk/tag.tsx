import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import { govukBem } from ".";

const tagClasses = govukBem("tag");

export interface TagProps extends ComponentPropsWithoutRef<"strong"> {
  color?:
    | "grey"
    | "green"
    | "turquoise"
    | "blue"
    | "purple"
    | "pink"
    | "red"
    | "orange"
    | "yellow";
}

export default forwardRef<HTMLElement, TagProps>(function Tag(
  { className, color, ...props },
  ref,
) {
  return (
    <strong
      ref={ref}
      {...props}
      className={tagClasses({
        modifier: color,
        extra: className,
      })}
    />
  );
});
