"use client";
import { processForm } from "./actions/process";
import Button from "@/components/govuk/button";
import ErrorMessage from "@/components/govuk/error-message";
import ErrorSummary, {
  ErrorSummaryLink,
} from "@/components/govuk/error-summary";
import { InputFormGroup } from "@/components/govuk/input";
import { profilePaths } from "@/constants/cookies";
import type { Profile } from "@/logic/drizzle/schema";
import { useFormState } from "@/logic/react-dom.shim";

export default function AddProfileForm({
  initialValues,
}: {
  initialValues: Partial<Profile>;
}) {
  const [state, formAction] = useFormState(processForm, {});
  const hasErrors = !!(
    state.formErrors?.length || Object.keys(state.fieldErrors ?? {}).length
  );
  return (
    <form action={formAction} noValidate>
      {hasErrors && (
        <ErrorSummary>
          {state.formErrors?.map((msg) => <li key={msg}>msg</li>)}
          {Object.entries(state.fieldErrors ?? {}).flatMap(([field, msgs]) =>
            msgs.map((msg) => (
              <li key={msg}>
                <ErrorSummaryLink href={`#profile.${field}`} replace>
                  {msg}
                </ErrorSummaryLink>
              </li>
            )),
          )}
        </ErrorSummary>
      )}
      <InputFormGroup
        label="What is the name of the profile?"
        labelIsHeading
        labelSize="l"
        name="name"
        id={profilePaths.name}
        width={5}
        error={!!state.fieldErrors?.name}
        errorMessage={state.fieldErrors?.name?.join("\n")}
        defaultValue={initialValues.name}
      />
      <Button type="submit">Continue</Button>
      {state.formErrors?.length ? (
        <ErrorMessage>{state.formErrors.join("\n")}</ErrorMessage>
      ) : null}
    </form>
  );
}
