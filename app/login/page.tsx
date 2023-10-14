import Messages from "./messages";
import styles from "./page.module.scss";
import Button, { ButtonGroup } from "@/components/govuk/button";
import Fieldset, {
  FieldsetHeading,
  FieldsetLegend,
} from "@/components/govuk/fieldset";
import { InputFormGroup } from "@/components/govuk/input";
import { BackLink } from "@/components/govuk/link";
import Template from "@/components/govuk/template";

export default function Login() {
  return (
    <Template beforeContent={<BackLink />}>
      <form action="/auth/sign-in" method="post" className={styles.form}>
        <Fieldset>
          <FieldsetLegend size="l">
            <FieldsetHeading>Sign in</FieldsetHeading>
          </FieldsetLegend>
          <InputFormGroup name="email" id="email" label="Email" required />
          <InputFormGroup
            name="password"
            id="password"
            label="Password"
            required
            type="password"
          />
        </Fieldset>
        <ButtonGroup>
          <Button type="submit">Sign in</Button>
          <Button color="secondary" formAction="/auth/sign-up">
            Sign up
          </Button>
        </ButtonGroup>
        <Messages />
      </form>
    </Template>
  );
}
