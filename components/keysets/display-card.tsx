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
import type { Design, Keyset } from "@/logic/drizzle/schema";
import { getKeysetName, pluralise } from "@/logic/lib/format";

type KeysetWithDesigns = Keyset & {
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
          <SummaryListKey>Status</SummaryListKey>
          <SummaryListValue>
            <StatusTag status={keyset.status} />
          </SummaryListValue>
        </SummaryListRow>
        <SummaryListRow>
          <SummaryListKey>Shipped</SummaryListKey>
          <SummaryListValue>{keyset.shipped ? "Yes" : "No"}</SummaryListValue>
        </SummaryListRow>
      </SummaryList>
    </SummaryCardContent>
  </SummaryCard>
);
