import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import NextLink from "next/link";
import LogoutButton from "../components/logout-button";
import { DisplayTable } from "@/components/display";
import Button from "@/components/govuk/button";
import { MainWrapper, WidthContainer } from "@/components/govuk/grid";
import Header, {
  HeaderContent,
  HeaderLink,
  HeaderLogo,
  HeaderLogotype,
  HeaderService,
} from "@/components/govuk/header";
import Navigation, {
  NavigationItem,
} from "@/components/govuk/header/navigation";
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
import { selectKeysets } from "@/logic/drizzle";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const entries = await selectKeysets;

  return (
    <>
      <Header app>
        <HeaderLogo>
          <HeaderLink href="/" homepage>
            <HeaderLogotype>KeycapLendar</HeaderLogotype>
          </HeaderLink>
        </HeaderLogo>
        <HeaderContent>
          <HeaderService href="/">Home</HeaderService>
          <Navigation>
            <NavigationItem href="/">Navigation item 1</NavigationItem>
            <NavigationItem href="/somewhere">Navigation item 2</NavigationItem>
          </Navigation>
        </HeaderContent>
      </Header>
      <WidthContainer>
        <MainWrapper size="l">
          {user ? (
            <LogoutButton />
          ) : (
            <NextLink href="/login" style={{ textDecoration: "none" }}>
              <Button>Log in</Button>
            </NextLink>
          )}
          {entries.map((entry) => (
            <SummaryCard key={entry.id}>
              <SummaryCardTitleWrapper>
                <SummaryCardTitle>
                  {entry.profile === "Cherry"
                    ? entry.manufacturer ?? entry.profile
                    : entry.profile}{" "}
                  {entry.colorway}
                </SummaryCardTitle>
              </SummaryCardTitleWrapper>
              <SummaryCardContent>
                <SummaryList>
                  <SummaryListRow>
                    <SummaryListKey>Designer(s)</SummaryListKey>
                    <SummaryListValue>
                      <List>
                        {entry.designs.map(({ designerName }) => (
                          <li key={designerName}>{designerName}</li>
                        ))}
                      </List>
                    </SummaryListValue>
                  </SummaryListRow>
                  <SummaryListRow>
                    <SummaryListKey>Vendors</SummaryListKey>
                    <SummaryListValue>
                      <List variant="bullet">
                        {entry.listings.map((listing) => (
                          <li key={listing.vendorName}>
                            {listing.url ? (
                              <Link href={listing.url}>
                                {listing.vendorName}
                              </Link>
                            ) : (
                              listing.vendorName
                            )}
                          </li>
                        ))}
                      </List>
                    </SummaryListValue>
                  </SummaryListRow>
                </SummaryList>
              </SummaryCardContent>
            </SummaryCard>
          ))}
          <DisplayTable data={entries} />
        </MainWrapper>
      </WidthContainer>
    </>
  );
}
