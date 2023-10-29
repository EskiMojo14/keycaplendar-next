import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { forwardRef } from "react";
import ErrorMessage from "./error-message";
import FormGroup from "./form-group";
import Hint from "./hint";
import Label, { LabelWrapper } from "./label";
import { govukBem } from ".";

const inputClasses = govukBem("input");

export interface InputProps extends ComponentPropsWithoutRef<"input"> {
  error?: boolean;
  extraLetterSpacing?: boolean;
  width?: 30 | 20 | 10 | 5 | 4 | 3 | 2;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, error = false, extraLetterSpacing = false, width, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      {...props}
      className={inputClasses({
        modifiers: {
          error,
          "extra-letter-spacing": extraLetterSpacing,
          ...(width && { ["width-" + width]: true }),
        },
        extra: className,
      })}
    />
  );
});

export default Input;

export const InputWrapper = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(function InputWrapper({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      {...props}
      className={inputClasses({
        element: "wrapper",
        extra: className,
      })}
    />
  );
});

export const InputPrefix = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(function InputPrefix({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      aria-hidden={true}
      {...props}
      className={inputClasses({
        element: "prefix",
        extra: className,
      })}
    />
  );
});

export const InputSuffix = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(function InputPrefix({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      aria-hidden={true}
      {...props}
      className={inputClasses({
        element: "suffix",
        extra: className,
      })}
    />
  );
});

export interface InputFormGroupProps extends InputProps {
  label: ReactNode;
  labelIsHeading?: boolean;
  labelSize?: "xl" | "l" | "m" | "s";
  hint?: string;
  errorMessage?: string;
}

const append = (base: string | undefined, suffix: string) =>
  base && base + suffix;

const describedBy = (...ids: Array<string | undefined>) =>
  ids.filter(Boolean).join(" ");

export const InputFormGroup = forwardRef<HTMLInputElement, InputFormGroupProps>(
  function InputFormGroup(
    {
      label,
      labelIsHeading,
      labelSize,
      hint,
      errorMessage,
      id,
      error,
      ...props
    },
    ref,
  ) {
    const labelEl = (
      <Label size={labelSize} htmlFor={id}>
        {label}
      </Label>
    );
    const hintId = append(id, "-hint");
    const errorId = append(id, "-error");
    return (
      <FormGroup error={error}>
        {labelIsHeading ? <LabelWrapper>{labelEl}</LabelWrapper> : labelEl}
        {hint && <Hint id={hintId}>{hint}</Hint>}
        {errorMessage && (
          <ErrorMessage id={errorId}>{errorMessage}</ErrorMessage>
        )}
        <Input
          ref={ref}
          aria-describedby={describedBy(hintId, errorId)}
          {...props}
          error={error}
          id={id}
        />
      </FormGroup>
    );
  },
);
