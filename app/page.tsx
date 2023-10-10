import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import NextLink from "next/link";
import LogoutButton from "../components/logout-button";
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
            <DisplayCard key={entry.id} keyset={entry} />
          ))}
          <DisplayTable data={entries} />
        </MainWrapper>
      </WidthContainer>
    </>
  );
}
