import { GridColumn, GridRow } from "@/components/govuk/grid";
import Panel from "@/components/govuk/panel";
import Template from "@/components/govuk/template";

export default function ConfirmProfile({
  searchParams: { name },
}: {
  searchParams: { name?: string };
}) {
  return (
    <Template>
      <GridRow>
        <GridColumn size="two-thirds">
          <Panel confirmation title="Upload successful">
            Profile <strong>{name}</strong> added.
          </Panel>
        </GridColumn>
      </GridRow>
    </Template>
  );
}
