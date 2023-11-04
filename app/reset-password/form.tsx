"use client";
import { resetPassword } from "../auth/actions";
import FormStep from "@/components/form";
import Fieldset, {
  FieldsetHeading,
  FieldsetLegend,
} from "@/components/govuk/fieldset";
import { InputFormGroup } from "@/components/govuk/input";
import { Body } from "@/components/govuk/typography";
import OriginField from "@/components/origin-field";
import useFormStep from "@/logic/hooks/use-form-step";

export default function ResetPasswordForm() {
  const { getFieldProps, getFormStepProps } = useFormStep(
    resetPassword,
    {},
    "reset-pwd",
  );
  return (
    <FormStep {...getFormStepProps()} buttonText="Send email">
      <Fieldset>
        <FieldsetLegend size="l">
          <FieldsetHeading>Forgot your password?</FieldsetHeading>
        </FieldsetLegend>
        <Body>
          We&apos;ll then send you an email which you can use to set up a new
          password.
        </Body>
        <OriginField {...getFieldProps("origin")} />
        <InputFormGroup {...getFieldProps("email")} label="Email address" />
      </Fieldset>
    </FormStep>
  );
}
