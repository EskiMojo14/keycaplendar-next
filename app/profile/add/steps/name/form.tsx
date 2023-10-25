"use client";
import { nameStep } from "../actions";
import FormStep from "@/components/form";
import { InputFormGroup } from "@/components/govuk/input";
import { profilePaths } from "@/constants/cookies";
import { useFormState } from "@/logic/react-dom.shim";

export default function ProfileName({
  defaultValue,
}: {
  defaultValue?: string;
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
        defaultValue={defaultValue}
      />
    </FormStep>
  );
}
