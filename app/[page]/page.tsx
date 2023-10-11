import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import NextLink from "next/link";
import { redirect } from "next/navigation";
import LogoutButton from "../../components/logout-button";
import { DisplayCard } from "@/components/display-cards";
import { DisplayTable } from "@/components/display-table";
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
import { pagesByStatus, getKeysetsByPage } from "@/logic/drizzle";

export const dynamic = "force-dynamic";

export default async function Index({
  params,
}: {
  params: { page: keyof typeof pagesByStatus };
}) {
  const { page } = params;
  if (!(page in pagesByStatus)) {
    redirect("/404");
  }
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const entries = await getKeysetsByPage(page);

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
            <NavigationItem href="/calendar">Calendar</NavigationItem>
            <NavigationItem href="/live">Live</NavigationItem>
            <NavigationItem href="/ic">IC</NavigationItem>
            <NavigationItem href="/previous">Previous</NavigationItem>
            <NavigationItem href="/timeline">Timeline</NavigationItem>
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
            <DisplayCard key={entry.id} keyset={entry} />
          ))}
          <DisplayTable data={entries} />
        </MainWrapper>
      </WidthContainer>
    </>
  );
}
