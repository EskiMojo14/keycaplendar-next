"use client";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { signIn, signUp } from "../auth/actions";
import FormStep from "@/components/form";
import Button, { ButtonGroup } from "@/components/govuk/button";
import Fieldset, {
  FieldsetHeading,
  FieldsetLegend,
} from "@/components/govuk/fieldset";
import { InputFormGroup } from "@/components/govuk/input";
import type { FormState } from "@/logic/form";

export default function SignUpForm() {
  const [currentState, setCurrentState] = useState<FormState>({});
  const [signInState, signInAction] = useFormState(signIn, {});
  useEffect(() => {
    setCurrentState(signInState);
  }, [signInState, setCurrentState]);
  const [signUpState, signUpAction] = useFormState(signUp, {});
  useEffect(() => {
    setCurrentState(signUpState);
  }, [signUpState, setCurrentState]);
  return (
    <FormStep
      action={signInAction}
      state={currentState}
      namespace="login"
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
        <input type="hidden" name="origin" value={location.origin} />
        <InputFormGroup
          name="email"
          id="login.email"
          label="Email"
          error={!!currentState.fieldErrors?.email}
          errorMessage={currentState.fieldErrors?.email?.join("\n")}
        />
        <InputFormGroup
          name="password"
          id="login.password"
          label="Password"
          type="password"
          error={!!currentState.fieldErrors?.password}
          errorMessage={currentState.fieldErrors?.password?.join("\n")}
        />
      </Fieldset>
    </FormStep>
  );
}
