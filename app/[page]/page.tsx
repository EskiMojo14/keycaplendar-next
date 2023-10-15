import { notFound } from "next/navigation";
import styles from "./page.module.scss";
import { GridColumn, GridRow } from "@/components/govuk/grid";
import { NavigationItem } from "@/components/govuk/header/navigation";
import Link from "@/components/govuk/link";
import Template from "@/components/govuk/template";
import KeysetList from "@/components/keysets/keyset-list";
import { pagesByStatus, getKeysetsByPage } from "@/logic/drizzle";

export const dynamic = "force-dynamic";

export default async function Index({
  params,
}: {
  params: { page: keyof typeof pagesByStatus };
}) {
  const { page } = params;
  if (!Object.hasOwn(pagesByStatus, page)) {
    return notFound();
  }

  const entries = await getKeysetsByPage(page);

  return (
    <Template
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
        <GridColumn size="one-quarter" className={styles.actions}>
          <Link href="/add-keyset">Add keyset</Link>
        </GridColumn>
        <GridColumn size="three-quarters">
          <KeysetList keysets={entries} />
        </GridColumn>
      </GridRow>
    </Template>
  );
}
