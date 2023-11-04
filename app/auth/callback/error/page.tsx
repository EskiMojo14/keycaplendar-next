import Description from "./description";
import { GridColumn, GridRow } from "@/components/govuk/grid";
import Template from "@/components/govuk/template";
import { Heading } from "@/components/govuk/typography";

export default function AuthError() {
  return (
    <Template>
      <GridRow>
        <GridColumn size="two-thirds">
          <Heading size="l">Something went wrong</Heading>
          <Description />
        </GridColumn>
      </GridRow>
    </Template>
  );
}
