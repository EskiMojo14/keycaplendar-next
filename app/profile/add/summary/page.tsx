import type { Metadata } from "next";
import { cookies } from "next/headers";
import { z } from "zod";
import SubmitForm from "./submit";
import { GridColumn, GridRow } from "@/components/govuk/grid";
import Link, { BackLink } from "@/components/govuk/link";
import SummaryList, {
  SummaryListKey,
  SummaryListRow,
  SummaryListValue,
} from "@/components/govuk/summary-list";
import Template from "@/components/govuk/template";
import { Body, Heading } from "@/components/govuk/typography";
import { profilePaths } from "@/constants/cookies";

export function generateMetadata(): Metadata {
  const name = cookies().get(profilePaths.name)?.value;
  return {
    title: `Add profile${name ? ": " + name : ""}`,
  };
}

const profileSchema = z.object({
  name: z.string(),
});

export default function ProfileSummary() {
  const cookieStore = cookies();
  const parsed = profileSchema.safeParse({
    name: cookieStore.get(profilePaths.name)?.value,
  });
  if (!parsed.success) {
    return (
      <Template>
        <Heading size="l">Something went wrong</Heading>
        <Body size="m">
          Details failed to pass through the form. Please{" "}
          <Link href="/profile/add/steps/name">retry</Link>.
        </Body>
      </Template>
    );
  }
  const { data } = parsed;
  return (
    <Template beforeContent={<BackLink href="/profile/add/steps/name" />}>
      <GridRow>
        <GridColumn desktop="two-thirds">
          <Heading size="l">Check answers before submission</Heading>
          <Heading size="m" tag="h2">
            Profile details
          </Heading>
          <SummaryList>
            <SummaryListRow>
              <SummaryListKey>Name</SummaryListKey>
              <SummaryListValue>{data.name}</SummaryListValue>
              <SummaryListValue>
                <Link href="/profile/add/steps/name">Change</Link>
              </SummaryListValue>
            </SummaryListRow>
          </SummaryList>
          <Heading size="m" tag="h2">
            Confirm upload
          </Heading>
          <SubmitForm data={data} />
        </GridColumn>
      </GridRow>
    </Template>
  );
}
