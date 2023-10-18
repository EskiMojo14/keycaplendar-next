import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NavigationItem } from "@/components/govuk/header/navigation";
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
      <KeysetList keysets={entries} page={page} />
    </Template>
  );
}
