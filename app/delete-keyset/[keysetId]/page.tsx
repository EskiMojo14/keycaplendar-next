import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import CancelButton from "@/components/cancel-button";
import Button, { ButtonGroup } from "@/components/govuk/button";
import FormGroup from "@/components/govuk/form-group";
import Label, { LabelWrapper } from "@/components/govuk/label";
import { BackLink } from "@/components/govuk/link";
import Template from "@/components/govuk/template";
import { Body, Caption } from "@/components/govuk/typography";
import { db } from "@/logic/drizzle";
import { keysets } from "@/logic/drizzle/schema";
import { getKeysetName } from "@/logic/lib/format";

export default async function DeleteKeyset({
  params: { keysetId },
}: {
  params: { keysetId: string };
}) {
  async function deleteKeyset() {
    "use server";
    await db.delete(keysets).where(eq(keysets.id, keysetId));
    redirect("/calendar");
  }
  const keyset = await db.query.keysets.findFirst({
    where: (keysets, { eq }) => eq(keysets.id, keysetId),
  });
  if (!keyset) {
    return redirect("/calendar");
  }
  return (
    <Template beforeContent={<BackLink />}>
      <form action={deleteKeyset}>
        <FormGroup>
          <LabelWrapper>
            <Label size="l">
              <Caption size="l">{getKeysetName(keyset)}</Caption>
              Do you want to delete this keyset?
            </Label>
          </LabelWrapper>
          <Body>
            This will also delete any linked listings/designs. This cannot be
            undone.
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
