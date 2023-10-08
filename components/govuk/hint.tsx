import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import { govukBem } from ".";

const hintClasses = govukBem("hint");

export default forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
  function Hint({ className, ...props }, ref) {
    return (
      <div ref={ref} {...props} className={hintClasses({ extra: className })} />
    );
  },
);
