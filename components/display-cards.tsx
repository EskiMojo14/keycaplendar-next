import Link from "@/components/govuk/link";
import List from "@/components/govuk/list";
import SummaryCard, {
  SummaryCardContent,
  SummaryCardTitle,
  SummaryCardTitleWrapper,
} from "@/components/govuk/summary-card";
import SummaryList, {
  SummaryListKey,
  SummaryListRow,
  SummaryListValue,
} from "@/components/govuk/summary-list";
import StatusTag from "@/components/status-tag";
import type { Design, Keyset, Listing } from "@/logic/drizzle/schema";
import { getKeysetName } from "@/logic/lib/format";

type KeysetWithDesignsAndListings = Keyset & {
  designs: Array<Design>;
  listings: Array<Listing>;
};

export const DisplayCard = ({
  keyset,
}: {
  keyset: KeysetWithDesignsAndListings;
}) => (
  <SummaryCard>
    <SummaryCardTitleWrapper>
      <SummaryCardTitle>{getKeysetName(keyset)}</SummaryCardTitle>
    </SummaryCardTitleWrapper>
    <SummaryCardContent>
      <SummaryList>
        <SummaryListRow>
          <SummaryListKey>Designer(s)</SummaryListKey>
          <SummaryListValue>
            <List>
              {keyset.designs.map(({ designerName }) => (
                <li key={designerName}>{designerName}</li>
              ))}
            </List>
          </SummaryListValue>
        </SummaryListRow>
        <SummaryListRow>
          <SummaryListKey>Vendors</SummaryListKey>
          <SummaryListValue>
            <List variant="bullet">
              {keyset.listings.map((listing) => (
                <li key={listing.vendorName}>
                  {listing.url ? (
                    <Link href={listing.url}>{listing.vendorName}</Link>
                  ) : (
                    listing.vendorName
                  )}
                </li>
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
