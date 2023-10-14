import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Button, { ButtonGroup } from "@/components/govuk/button";
import FormGroup from "@/components/govuk/form-group";
import Label, { LabelWrapper } from "@/components/govuk/label";
import { BackLink } from "@/components/govuk/link";
import Template from "@/components/govuk/template";
import { Caption } from "@/components/govuk/typography";
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
    redirect("/");
  }
  const keyset = await db.query.keysets.findFirst({
    where: (keysets, { eq }) => eq(keysets.id, keysetId),
  });
  if (!keyset) {
    return redirect("/");
  }
  return (
    <Template beforeContent={<BackLink href="/">Back</BackLink>}>
      <form action={() => void deleteKeyset()}>
        <FormGroup>
          <LabelWrapper>
            <Label size="l">
              Delete {getKeysetName(keyset)}?
              <Caption size="m">
                Listings will also be deleted. This cannot be undone.
              </Caption>
            </Label>
          </LabelWrapper>
          <ButtonGroup>
            <Button color="secondary" formAction="/">
              Cancel
            </Button>
            <Button color="warning" type="submit">
              Delete
            </Button>
          </ButtonGroup>
        </FormGroup>
      </form>
    </Template>
  );
}
