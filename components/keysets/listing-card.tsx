import { format, isPast } from "date-fns";
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
import { pluralise } from "@/logic/lib/format";

export default async function ListingCard({ listing }: { listing: Listing }) {
  const vendor = await getVendorByName(listing.vendorName);
  const end = listing.gbEnd && new Date(listing.gbEnd);
  return (
    <SummaryCard>
      <SummaryCardTitleWrapper>
        <SummaryCardTitle>{listing.vendorName}</SummaryCardTitle>
        {listing.url && (
          <SummaryCardActions>
            <SummaryCardAction>
              <Link href={listing.url as Route}>Go to listing</Link>
            </SummaryCardAction>
          </SummaryCardActions>
        )}
      </SummaryCardTitleWrapper>
      <SummaryCardContent>
        <SummaryList>
          <SummaryListRow>
            <SummaryListKey>
              {pluralise(
                listing.regions?.length ?? 1,
                {
                  one: "Region",
                  other: "Regions",
                },
                "Region(s)",
              )}
            </SummaryListKey>
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
          {end && (
            <SummaryListRow>
              <SummaryListKey>{isPast(end) ? "Ended" : "Ends"}</SummaryListKey>
              <SummaryListValue>{format(end, dateFormat)}</SummaryListValue>
            </SummaryListRow>
          )}
        </SummaryList>
      </SummaryCardContent>
    </SummaryCard>
  );
}
