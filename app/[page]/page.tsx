import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import NextLink from "next/link";
import { redirect } from "next/navigation";
import LogoutButton from "../../components/logout-button";
import { DisplayCard } from "@/components/display-cards";
import { DisplayTable } from "@/components/display-table";
import Button from "@/components/govuk/button";
import { HeaderService } from "@/components/govuk/header";
import { NavigationItem } from "@/components/govuk/header/navigation";
import Template from "@/components/govuk/template";
import { pagesByStatus, getKeysetsByPage } from "@/logic/drizzle";

export const dynamic = "force-dynamic";

export default async function Index({
  params,
}: {
  params: { page: keyof typeof pagesByStatus };
}) {
  const { page } = params;
  if (!(page in pagesByStatus)) {
    redirect("/not-found");
  }
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const entries = await getKeysetsByPage(page);

  return (
    <Template
      service={<HeaderService href="/">Home</HeaderService>}
      nav={
        <>
          <NavigationItem href="/calendar">Calendar</NavigationItem>
          <NavigationItem href="/live">Live</NavigationItem>
          <NavigationItem href="/ic">IC</NavigationItem>
          <NavigationItem href="/previous">Previous</NavigationItem>
          <NavigationItem href="/timeline">Timeline</NavigationItem>
        </>
      }
    >
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
    </Template>
  );
}
