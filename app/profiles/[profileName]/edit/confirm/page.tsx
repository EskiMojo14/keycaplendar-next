import type { Metadata } from "next";
import { GridColumn, GridRow } from "@/components/govuk/grid";
import Panel from "@/components/govuk/panel";
import Template from "@/components/govuk/template";

interface Props {
  params: { profileName: string };
}

export function generateMetadata({ params: { profileName } }: Props): Metadata {
  return {
    title: `Edited profile: ${decodeURIComponent(profileName)}`,
  };
}

export default function ConfirmProfile({ params: { profileName } }: Props) {
  return (
    <Template>
      <GridRow>
        <GridColumn size="two-thirds">
          <Panel confirmation title="Edit successful">
            Profile <strong>{decodeURIComponent(profileName)}</strong> edited.
          </Panel>
        </GridColumn>
      </GridRow>
    </Template>
  );
}
