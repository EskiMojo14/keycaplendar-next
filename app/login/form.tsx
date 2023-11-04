"use client";
import { useFormState } from "react-dom";
import { signIn, signUp } from "../auth/actions";
import FormStep from "@/components/form";
import Button, { ButtonGroup } from "@/components/govuk/button";
import Fieldset, {
  FieldsetHeading,
  FieldsetLegend,
} from "@/components/govuk/fieldset";
import { InputFormGroup } from "@/components/govuk/input";
import OriginField from "@/components/origin-field";
import useFormStep from "@/logic/hooks/use-form-step";
import useLatestState from "@/logic/hooks/use-latest-state";

export default function SignUpForm() {
  const { state, getFieldProps, getFormStepProps } = useFormStep(
    signIn,
    {},
    "login",
  );
  const [signUpState, signUpAction] = useFormState(signUp, {});
  const currentState = useLatestState(state, signUpState);
  return (
    <FormStep
      {...getFormStepProps()}
      state={currentState}
      buttons={
        <ButtonGroup>
          <Button type="submit">Sign in</Button>
          <Button color="secondary" type="submit" formAction={signUpAction}>
            Sign up
          </Button>
        </ButtonGroup>
      }
    >
      <Fieldset>
        <FieldsetLegend size="l">
          <FieldsetHeading>Sign in</FieldsetHeading>
        </FieldsetLegend>
        <OriginField {...getFieldProps("origin")} />
        <InputFormGroup {...getFieldProps("email")} label="Email" />
        <InputFormGroup
          {...getFieldProps("password")}
          label="Password"
          type="password"
        />
      </Fieldset>
    </FormStep>
  );
}
