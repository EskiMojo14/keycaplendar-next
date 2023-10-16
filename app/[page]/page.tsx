import type { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "./page.module.scss";
import { GridColumn, GridRow } from "@/components/govuk/grid";
import { NavigationItem } from "@/components/govuk/header/navigation";
import Link from "@/components/govuk/link";
import Template from "@/components/govuk/template";
import KeysetList from "@/components/keysets/keyset-list";
import type { Page } from "@/constants/keyset";
import { pageLabels, pages } from "@/constants/keyset";
import { getKeysetsByPage } from "@/logic/drizzle";

export const dynamic = "force-dynamic";

interface Props {
  params: { page: Page };
}

export function generateMetadata({ params: { page } }: Props): Metadata {
  return {
    title: `KeycapLendar: ${pageLabels[page]}`,
  };
}

export default async function Index({ params: { page } }: Props) {
  if (!pages.includes(page)) {
    return notFound();
  }

  const entries = await getKeysetsByPage(page);

  return (
    <Template
      nav={pages.map((page) => (
        <NavigationItem key={page} href={`/${page}`}>
          {pageLabels[page]}
        </NavigationItem>
      ))}
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
