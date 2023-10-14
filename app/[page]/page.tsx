import { redirect } from "next/navigation";
import { DisplayCard } from "@/components/display-cards";
import { DisplayTable } from "@/components/display-table";
import { GridColumn, GridRow } from "@/components/govuk/grid";
import { HeaderService } from "@/components/govuk/header";
import { NavigationItem } from "@/components/govuk/header/navigation";
import Link from "@/components/govuk/link";
import Template from "@/components/govuk/template";
import { pagesByStatus, getKeysetsByPage } from "@/logic/drizzle";

export const dynamic = "force-dynamic";

export default async function Index({
  params,
}: {
  params: { page: keyof typeof pagesByStatus };
}) {
  const { page } = params;
  if (!Object.hasOwn(pagesByStatus, page)) {
    redirect("/not-found");
  }

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
      <GridRow>
        <GridColumn size="one-quarter">
          <Link href="/add-keyset">Add keyset</Link>
        </GridColumn>
        <GridColumn size="three-quarters">
          {entries.map((entry) => (
            <DisplayCard key={entry.id} keyset={entry} />
          ))}
        </GridColumn>
        <DisplayTable data={entries} />
      </GridRow>
    </Template>
  );
}
