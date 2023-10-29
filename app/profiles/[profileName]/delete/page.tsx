import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import CancelButton from "@/components/cancel-button";
import Button, { ButtonGroup } from "@/components/govuk/button";
import FormGroup from "@/components/govuk/form-group";
import Label, { LabelWrapper } from "@/components/govuk/label";
import Template from "@/components/govuk/template";
import { Body, Caption } from "@/components/govuk/typography";
import { db } from "@/logic/drizzle";
import { profiles } from "@/logic/drizzle/schema";
import { route } from "@/logic/lib/route";

export default async function DeleteProfile({
  params: { profileName: encodedProfileName },
}: {
  params: { profileName: string };
}) {
  const profileName = decodeURIComponent(encodedProfileName);
  async function deleteProfile() {
    "use server";
    await db.delete(profiles).where(eq(profiles.name, profileName));
    redirect(route("/calendar"));
  }
  const profile = await db.query.profiles.findFirst({
    where: (profiles, { eq }) => eq(profiles.name, profileName),
  });
  if (!profile) {
    return redirect(route("/calendar"));
  }
  return (
    <Template>
      <form action={deleteProfile}>
        <FormGroup>
          <LabelWrapper>
            <Label size="l">
              <Caption size="l">{profileName}</Caption>
              Do you want to delete this profile?
            </Label>
          </LabelWrapper>
          <Body>
            All keysets for this profile must have already been deleted.
          </Body>
          <ButtonGroup>
            <CancelButton />
            <Button color="warning" type="submit">
              Delete
            </Button>
          </ButtonGroup>
        </FormGroup>
      </form>
    </Template>
  );
}
