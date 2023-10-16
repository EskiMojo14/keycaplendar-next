import { format } from "date-fns";
import { Body } from "../govuk/typography";
import styles from "./run-tagline.module.scss";
import { dateFormat } from "@/constants/format";
import { statusVerbs } from "@/constants/keyset";
import type { Keyset } from "@/logic/drizzle/schema";

export default function RunTagline({
  keyset,
}: {
  keyset: Pick<Keyset, "status" | "gbLaunch" | "gbEnd">;
}) {
  if (keyset.status === "ic") return null;
  return (
    <Body size="m">
      {statusVerbs[keyset.status]} from{" "}
      <span className={styles.date}>
        {keyset.gbLaunch && format(new Date(keyset.gbLaunch), dateFormat)}
      </span>
      {keyset.gbEnd && (
        <>
          {" "}
          to{" "}
          <span className={styles.date}>
            {format(new Date(keyset.gbEnd), dateFormat)}
          </span>
        </>
      )}
      .
    </Body>
  );
}
