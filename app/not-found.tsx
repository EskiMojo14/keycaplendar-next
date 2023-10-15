import { GridColumn, GridRow } from "@/components/govuk/grid";
import Template from "@/components/govuk/template";
import { Body, Heading } from "@/components/govuk/typography";

export default function ForeEauFore() {
  return (
    <Template>
      <GridRow>
        <GridColumn size="two-thirds">
          <Heading size="l">Page not found</Heading>
          <Body>If you typed the web address, check it is correct.</Body>
          <Body>
            If you pasted the web address, check you copied the entire address.
          </Body>
        </GridColumn>
      </GridRow>
    </Template>
  );
}
