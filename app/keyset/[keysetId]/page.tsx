import { redirect } from "next/navigation";
import styles from "./page.module.scss";
import Link from "@/components/govuk/link";
import Template from "@/components/govuk/template";
import { Heading } from "@/components/govuk/typography";
import { db } from "@/logic/drizzle";
import { getKeysetName } from "@/logic/lib/format";

export default async function Keyset({
  params: { keysetId },
}: {
  params: { keysetId: string };
}) {
  const keyset = await db.query.keysets.findFirst({
    where: (keysets, { eq }) => eq(keysets.id, keysetId),
  });
  if (!keyset) {
    return redirect("/calendar");
  }
  return (
    <Template>
      <Heading size="l">{getKeysetName(keyset)}</Heading>
      <div className={styles.actions}>
        <Link href={`/edit-keyset/${keysetId}`}>Edit</Link>
        <Link href={`/delete-keyset/${keysetId}`}>Delete</Link>
      </div>
    </Template>
  );
}
