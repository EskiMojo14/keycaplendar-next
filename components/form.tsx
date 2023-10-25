import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Button from "@/components/govuk/button";
import ErrorMessage from "@/components/govuk/error-message";
import ErrorSummary, {
  ErrorSummaryLink,
} from "@/components/govuk/error-summary";

export default function FormStep({
  action,
  state,
  children,
  namespace,
}: {
  action: ComponentPropsWithoutRef<"form">["action"];
  state: {
    formErrors?: Array<string>;
    fieldErrors?: Record<string, Array<string>>;
  };
  children?: ReactNode;
  namespace: string;
}) {
  const hasErrors = !!(
    state.formErrors?.length || Object.keys(state.fieldErrors ?? {}).length
  );
  return (
    <form action={action} noValidate>
      {hasErrors && (
        <ErrorSummary>
          {state.formErrors?.map((msg) => <li key={msg}>{msg}</li>)}
          {Object.entries(state.fieldErrors ?? {}).flatMap(([field, msgs]) =>
            msgs.map((msg) => (
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
      <Button type="submit">Continue</Button>
      {state.formErrors?.length ? (
        <ErrorMessage>{state.formErrors.join("\n")}</ErrorMessage>
      ) : null}
    </form>
  );
}
