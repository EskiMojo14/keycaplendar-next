import { format } from "date-fns";
import Link from "@/components/govuk/link";
import List from "@/components/govuk/list";
import SummaryCard, {
  SummaryCardAction,
  SummaryCardActions,
  SummaryCardContent,
  SummaryCardTitle,
  SummaryCardTitleWrapper,
} from "@/components/govuk/summary-card";
import SummaryList, {
  SummaryListKey,
  SummaryListRow,
  SummaryListValue,
} from "@/components/govuk/summary-list";
import StatusTag from "@/components/keysets/status-tag";
import { dateFormat } from "@/constants/format";
import type { OverviewKeyset, Design } from "@/logic/drizzle/schema";
import { getKeysetName, pluralise } from "@/logic/lib/format";

type KeysetWithDesigns = OverviewKeyset & {
  designs: Array<Design>;
};

export const DisplayCard = ({ keyset }: { keyset: KeysetWithDesigns }) => (
  <SummaryCard>
    <SummaryCardTitleWrapper>
      <SummaryCardTitle>{getKeysetName(keyset)}</SummaryCardTitle>
      <SummaryCardActions>
        <SummaryCardAction>
          <Link href={`/keyset/${keyset.id}`}>View</Link>
        </SummaryCardAction>
        <SummaryCardAction>
          <Link href={`/edit-keyset/${keyset.id}`}>Edit</Link>
        </SummaryCardAction>
      </SummaryCardActions>
    </SummaryCardTitleWrapper>
    <SummaryCardContent>
      <SummaryList>
        <SummaryListRow>
          <SummaryListKey>
            {pluralise(
              keyset.designs.length,
              {
                one: "Designer",
                other: "Designers",
              },
              "Designer(s)",
            )}
          </SummaryListKey>
          <SummaryListValue>
            <List>
              {keyset.designs.map(({ designerName }) => (
                <li key={designerName}>{designerName}</li>
              ))}
            </List>
          </SummaryListValue>
        </SummaryListRow>
        <SummaryListRow>
          <SummaryListKey>IC Date</SummaryListKey>
          <SummaryListValue>
            {format(new Date(keyset.icDate), dateFormat)}
          </SummaryListValue>
        </SummaryListRow>
        <SummaryListRow>
          <SummaryListKey>Status</SummaryListKey>
          <SummaryListValue>
            <StatusTag status={keyset.status} />
          </SummaryListValue>
        </SummaryListRow>
        <SummaryListRow>
          <SummaryListKey>GB Launch</SummaryListKey>
          <SummaryListValue>
            {keyset.gbLaunch
              ? format(new Date(keyset.gbLaunch), dateFormat)
              : "n/a"}
          </SummaryListValue>
        </SummaryListRow>
        <SummaryListRow>
          <SummaryListKey>GB End</SummaryListKey>
          <SummaryListValue>
            {keyset.gbEnd ? format(new Date(keyset.gbEnd), dateFormat) : "n/a"}
          </SummaryListValue>
        </SummaryListRow>
      </SummaryList>
    </SummaryCardContent>
  </SummaryCard>
);
