import { format } from "date-fns";
import type { Route } from "next";
import Link from "../govuk/link";
import List from "../govuk/list";
import SummaryCard, {
  SummaryCardAction,
  SummaryCardActions,
  SummaryCardContent,
  SummaryCardTitle,
  SummaryCardTitleWrapper,
} from "../govuk/summary-card";
import SummaryList, {
  SummaryListKey,
  SummaryListRow,
  SummaryListValue,
} from "../govuk/summary-list";
import { dateFormat } from "@/constants/format";
import { getVendorByName } from "@/logic/cached";
import type { Listing } from "@/logic/drizzle/schema";

export default async function ListingCard({ listing }: { listing: Listing }) {
  const vendor = await getVendorByName(listing.vendorName);
  return (
    <SummaryCard>
      <SummaryCardTitleWrapper>
        <SummaryCardTitle>{listing.vendorName}</SummaryCardTitle>
        {listing.url && (
          <SummaryCardActions>
            <SummaryCardAction>
              <Link href={listing.url as Route}>Open</Link>
            </SummaryCardAction>
          </SummaryCardActions>
        )}
      </SummaryCardTitleWrapper>
      <SummaryCardContent>
        <SummaryList>
          <SummaryListRow>
            <SummaryListKey>Regions</SummaryListKey>
            <SummaryListValue>
              <List>
                {listing.regions ? (
                  listing.regions.map((region) => (
                    <li key={region}>{region}</li>
                  ))
                ) : (
                  <li>{vendor?.country}</li>
                )}
              </List>
            </SummaryListValue>
          </SummaryListRow>
          {listing.gbEnd && (
            <SummaryListRow>
              <SummaryListKey>Ends</SummaryListKey>
              <SummaryListValue>
                {format(new Date(listing.gbEnd), dateFormat)}
              </SummaryListValue>
            </SummaryListRow>
          )}
        </SummaryList>
      </SummaryCardContent>
    </SummaryCard>
  );
}
