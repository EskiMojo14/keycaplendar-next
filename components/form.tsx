import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Body } from "./govuk/typography";
import Button from "@/components/govuk/button";
import ErrorMessage from "@/components/govuk/error-message";
import ErrorSummary, {
  ErrorSummaryLink,
} from "@/components/govuk/error-summary";
import type { FormState } from "@/logic/form";

export interface FormStepProps {
  action: ComponentPropsWithoutRef<"form">["action"];
  state: FormState;
  children?: ReactNode;
  namespace: string;
  buttonText?: string;
  buttons?: ReactNode;
}

export default function FormStep({
  action,
  state,
  children,
  namespace,
  buttonText = "Continue",
  buttons = <Button type="submit">{buttonText}</Button>,
}: FormStepProps) {
  const hasErrors = !!(
    state.formErrors?.length || Object.keys(state.fieldErrors ?? {}).length
  );
  return (
    <form action={action} noValidate>
      {hasErrors && (
        <ErrorSummary>
          {state.formErrors?.map((msg) => <li key={msg}>{msg}</li>)}
          {Object.entries(state.fieldErrors ?? {}).flatMap(
            ([field, msgs]) =>
              msgs?.map((msg) => (
                <li key={msg}>
                  <ErrorSummaryLink href={`#${namespace}.${field}`} replace>
                    {msg}
                  </ErrorSummaryLink>
                </li>
              )),
          )}
        </ErrorSummary>
      )}
      {children}
      {buttons}
      {state.formErrors?.length ? (
        <ErrorMessage>{state.formErrors.join("\n")}</ErrorMessage>
      ) : null}
      {state.messages?.length ? <Body>{state.messages.join("\n")}</Body> : null}
    </form>
  );
}
