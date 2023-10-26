import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
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
import { getProfileByName } from "@/logic/cached";

interface Props {
  params: { profileName: string };
}

export function generateMetadata({
  params: { profileName: encodedProfileName },
}: Props): Metadata {
  const profileName = decodeURIComponent(encodedProfileName);
  return {
    title: `Edit profile: ${profileName}`,
  };
}

const profileSchema = z.object({
  name: z.string(),
});

export default async function ProfileSummary({
  params: { profileName: encodedProfileName },
}: Props) {
  const profileName = decodeURIComponent(encodedProfileName);
  const profile = await getProfileByName(profileName);
  if (!profile) {
    return notFound();
  }
  const cookieStore = cookies();
  const parsed = profileSchema.partial().safeParse({
    name: cookieStore.get("edit.profile.name")?.value,
  });
  if (!parsed.success) {
    return (
      <Template>
        <Heading size="l">Something went wrong</Heading>
        <Body size="m">
          Details failed to pass through the form. Please{" "}
          <Link href={`/profiles/${encodedProfileName}/edit`}>retry</Link>.
        </Body>
      </Template>
    );
  }
  const { data } = parsed;
  return (
    <Template
      beforeContent={<BackLink href={`/profiles/${encodedProfileName}`} />}
    >
      <GridRow>
        <GridColumn desktop="two-thirds">
          <Heading size="l">Check answers before submission</Heading>
          <Heading size="m" tag="h2">
            Profile details
          </Heading>
          <SummaryList>
            <SummaryListRow>
              <SummaryListKey>Name</SummaryListKey>
              <SummaryListValue>{data.name ?? profile.name}</SummaryListValue>
              <SummaryListValue>
                <Link href={`/profiles/${encodedProfileName}/edit/steps/name`}>
                  Change
                </Link>
              </SummaryListValue>
            </SummaryListRow>
          </SummaryList>
          <Heading size="m" tag="h2">
            Confirm edit
          </Heading>
          <SubmitForm data={data} originalName={profileName} />
        </GridColumn>
      </GridRow>
    </Template>
  );
}
