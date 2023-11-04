import { updatePassword } from "../auth/actions";
import FormStep from "@/components/form";
import Fieldset, {
  FieldsetHeading,
  FieldsetLegend,
} from "@/components/govuk/fieldset";
import { InputFormGroup } from "@/components/govuk/input";
import useFormStep from "@/logic/hooks/use-form-step";

export default function UpdatePasswordForm() {
  const { getFieldProps, getFormStepProps } = useFormStep(
    updatePassword,
    {},
    "update-pwd",
  );
  return (
    <FormStep {...getFormStepProps()} buttonText="Create a new password">
      <Fieldset>
        <FieldsetHeading>
          <FieldsetLegend size="l">Create a new password</FieldsetLegend>
        </FieldsetHeading>
        <InputFormGroup
          label="New password"
          {...getFieldProps("newPassword")}
          type="password"
        />
        <InputFormGroup
          label="Confirm new password"
          {...getFieldProps("confirmPassword")}
          type="password"
        />
      </Fieldset>
    </FormStep>
  );
}
