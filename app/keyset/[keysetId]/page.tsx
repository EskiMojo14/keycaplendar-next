import { format } from "date-fns";
import type { Route } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "./page.module.scss";
import { GridColumn, GridRow } from "@/components/govuk/grid";
import Link, { BackLink } from "@/components/govuk/link";
import Template from "@/components/govuk/template";
import { Body, Caption, Heading } from "@/components/govuk/typography";
import ListingCard from "@/components/keysets/listing-card";
import StatusTag from "@/components/status-tag";
import { dateFormat } from "@/constants/format";
import { getKeysetById } from "@/logic/cached";
import { getKeysetName, getKeysetRun } from "@/logic/lib/format";

const listFormat = new Intl.ListFormat();

export default async function Keyset({
  params: { keysetId },
}: {
  params: { keysetId: string };
}) {
  const keyset = await getKeysetById(keysetId);

  if (!keyset) {
    return notFound();
  }
  return (
    <Template beforeContent={<BackLink />}>
      <GridRow>
        <GridColumn size="two-thirds">
          <Heading size="l">
            {getKeysetName(keyset)}
            <Caption size="m">
              Designed by{" "}
              {listFormat.format(
                keyset.designs.map(({ designerName }) => designerName),
              )}
            </Caption>
          </Heading>
          <StatusTag status={keyset.status} />
          <div className={styles.actions}>
            <Link href={`/edit-keyset/${keysetId}`}>Edit</Link>
            <Link href={`/delete-keyset/${keysetId}`}>Delete</Link>
          </div>
          <Body size="s">{keyset.notes}</Body>
        </GridColumn>
        <GridColumn size="one-third">
          <div className={styles.thumbnail}>
            <Image
              src={keyset.thumbnail.replace("keysets%2F", "thumbs%2F")}
              alt={`A preview of ${getKeysetName(keyset)}`}
              sizes="(max-width: 40.0625em) 100vw"
              fill
            />
          </div>
        </GridColumn>
      </GridRow>
      <Body size="m">
        <Link href={keyset.details as Route}>
          IC posted {format(new Date(keyset.icDate), dateFormat)}.
        </Link>
      </Body>
      <Body size="m">{getKeysetRun(keyset)}</Body>
      {keyset.shipped ? <Body size="m">This set has shipped.</Body> : null}
      {keyset.listings.length ? (
        <>
          <Heading size="m">Listings</Heading>
          {keyset.listings.map((listing) => (
            <ListingCard key={listing.vendorName} listing={listing} />
          ))}
        </>
      ) : null}
    </Template>
  );
}
