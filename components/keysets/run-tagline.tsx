import { format } from "date-fns";
import styles from "./run-tagline.module.scss";
import { dateFormat } from "@/constants/format";
import { statusVerbs } from "@/constants/keyset";
import type { Keyset } from "@/logic/drizzle/schema";

export default function RunTagline({
  keyset,
}: {
  keyset: Pick<Keyset, "status" | "gbLaunch" | "gbEnd">;
}) {
  if (keyset.status === "ic" || !keyset.status) return null;
  return (
    <li>
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
    </li>
  );
}
