"use client";
import { Button as GovUKButton } from "govuk-frontend";
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef, useRef } from "react";
import { mergeRefs } from "react-merge-refs";
import { makeUseModule } from "./use-module";
import { govukBem } from ".";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  color?: "secondary" | "warning" | "inverse";
}

const buttonClasses = govukBem("button");

const useButton = makeUseModule(GovUKButton, "Button");

export default forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, color, ...props },
  ref,
) {
  const ownRef = useRef<HTMLButtonElement>(null);
  useButton(ownRef);
  return (
    <button
      {...props}
      ref={mergeRefs([ref, ownRef])}
      className={buttonClasses({
        modifiers: color ?? "",
        extra: className,
      })}
    />
  );
});

const buttonGroupClasses = govukBem("button-group");

export const ButtonGroup = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(function ButtonGroup({ className, ...props }, ref) {
  return (
    <div
      {...props}
      ref={ref}
      className={buttonGroupClasses({ extra: className })}
    />
  );
});
