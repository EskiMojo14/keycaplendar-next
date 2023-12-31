import SignUpForm from "./form";
import { GridColumn, GridRow } from "@/components/govuk/grid";
import Link from "@/components/govuk/link";
import Template from "@/components/govuk/template";

export default function Login() {
  return (
    <Template>
      <GridRow>
        <GridColumn size="two-thirds">
          <SignUpForm />
          <Link href="/reset-password">Forgot your password?</Link>
        </GridColumn>
      </GridRow>
    </Template>
  );
}
