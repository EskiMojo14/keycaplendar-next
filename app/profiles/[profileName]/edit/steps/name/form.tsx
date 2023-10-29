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
  const { getFieldProps, getFormStepProps } = useFormStep(
    nameStep,
    {},
    "edit.profile",
  );
  return (
    <FormStep {...getFormStepProps()}>
      <input
        type="hidden"
        {...getFieldProps("originalName")}
        value={defaultValue}
        readOnly
      />
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
