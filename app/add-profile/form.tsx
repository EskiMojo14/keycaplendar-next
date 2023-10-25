"use client";
import { nameStep } from "./actions";
import FormStep from "@/components/form";
import { InputFormGroup } from "@/components/govuk/input";
import { profilePaths } from "@/constants/cookies";
import type { Profile } from "@/logic/drizzle/schema";
import { useFormState } from "@/logic/react-dom.shim";

export default function AddProfileForm({
  initialValues,
}: {
  initialValues: Partial<Profile>;
}) {
  const [state, action] = useFormState(nameStep, {});
  return (
    <FormStep {...{ action, state }} namespace="profile">
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
    </FormStep>
  );
}
