"use client";
import { nameStep } from "../actions";
import FormStep from "@/components/form";
import { InputFormGroup } from "@/components/govuk/input";
import useFormStep from "@/logic/hooks/use-form-step";

export default function ProfileName({
  defaultValue,
}: {
  defaultValue?: string;
}) {
  const { getFormStepProps, getFieldProps } = useFormStep(
    nameStep,
    {},
    "profile",
  );
  return (
    <FormStep {...getFormStepProps()}>
      <InputFormGroup
        label="What is the name of the profile?"
        labelIsHeading
        labelSize="l"
        width={5}
        {...getFieldProps("name")}
        defaultValue={defaultValue}
      />
    </FormStep>
  );
}
