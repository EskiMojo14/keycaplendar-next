"use client";
import { DisplayCard } from "./display-card";
import { DisplayTable } from "./display-table";
import type { Page } from "@/constants/keyset";
import { pageSorts } from "@/constants/keyset";
import type { OverviewKeyset } from "@/logic/drizzle";
import type { Design } from "@/logic/drizzle/schema";
import { useMediaQuery } from "@/logic/hooks/use-media-query";

export default function KeysetList({
  keysets,
  page,
}: {
  keysets: Array<OverviewKeyset & { designs: Array<Design> }>;
  page?: Page;
}) {
  const largeScreen = useMediaQuery("(min-width: 48.0625em)");
  return largeScreen ? (
    <DisplayTable data={keysets} defaultSort={page && pageSorts[page]} />
  ) : (
    keysets.map((keyset) => <DisplayCard key={keyset.id} keyset={keyset} />)
  );
}
