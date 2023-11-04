import ResetPasswordForm from "./form";
import { GridColumn, GridRow } from "@/components/govuk/grid";
import Template from "@/components/govuk/template";

export default function ResetPassword() {
  return (
    <Template>
      <GridRow>
        <GridColumn size="two-thirds">
          <ResetPasswordForm />
        </GridColumn>
      </GridRow>
    </Template>
  );
}
