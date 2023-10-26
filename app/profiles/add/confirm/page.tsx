import type { Metadata } from "next";
import { GridColumn, GridRow } from "@/components/govuk/grid";
import Panel from "@/components/govuk/panel";
import Template from "@/components/govuk/template";

interface Props {
  searchParams: { name: string };
}

export function generateMetadata({ searchParams: { name } }: Props): Metadata {
  return {
    title: `Added profile: ${name}`,
  };
}

export default function ConfirmProfile({ searchParams: { name } }: Props) {
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
