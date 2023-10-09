import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { forwardRef } from "react";
import ErrorMessage from "./error-message";
import FormGroup from "./form-group";
import Hint from "./hint";
import Label, { LabelWrapper } from "./label";
import { govukBem } from ".";

const textareaClasses = govukBem("textarea");

export interface TextareaProps extends ComponentPropsWithoutRef<"textarea"> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function TextArea({ className, error = false, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        {...props}
        className={textareaClasses({
          modifiers: {
            error,
          },
          extra: className,
        })}
      />
    );
  },
);

export default Textarea;

interface TextareaFormGroupProps extends TextareaProps {
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

export const TextareaFormGroup = forwardRef<
  HTMLTextAreaElement,
  TextareaFormGroupProps
>(function InputFormGroup(
  { label, labelIsHeading, labelSize, hint, errorMessage, id, ...props },
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
    <FormGroup>
      {labelIsHeading ? <LabelWrapper>{labelEl}</LabelWrapper> : labelEl}
      {hint && <Hint id={hintId}>{hint}</Hint>}
      {errorMessage && <ErrorMessage id={errorId}>{errorMessage}</ErrorMessage>}
      <Textarea
        ref={ref}
        aria-describedby={describedBy(hintId, errorId)}
        {...props}
        id="id"
      />
    </FormGroup>
  );
});
