import { Database } from "@/types/supabase";
import { Table } from "drizzle-orm";
import {
  designs,
  designers,
  keysets,
  listings,
  manufacturers,
  profiles,
  vendors,
  datePrecisionEnum,
  statusEnum,
} from "./schema";
import {
  Diff,
  Equal,
  Expect,
  CamelKeysWithUnderscore,
  PickPartial,
  Satisfies,
} from "@/types/util";
import { PgColumn } from "drizzle-orm/pg-core";

const tableMap = {
  designs,
  designers,
  keysets,
  listings,
  manufacturers,
  profiles,
  vendors,
} satisfies Record<keyof Database["public"]["Tables"], Table>;

type GeneratedColumnsMap = Satisfies<
  { keysets: { status: true } },
  {
    [K in keyof Database["public"]["Tables"]]?: {
      [Column in keyof Database["public"]["Tables"][K]["Row"]]?: true;
    };
  }
>;

type WithGeneratedColumns<
  TableName extends keyof Database["public"]["Tables"],
  T,
> = TableName extends keyof GeneratedColumnsMap
  ? {
      [K in keyof T]: K extends keyof GeneratedColumnsMap[TableName]
        ? GeneratedColumnsMap[TableName][K] extends true
          ? T[K] | null
          : T[K]
        : T[K];
    }
  : T;

type ColumnsWithDefaults<T extends Table> = T extends Table<infer Config>
  ? {
      [Column in keyof Config["columns"]]-?: Config["columns"][Column] extends PgColumn<
        infer ColumnConfig
      >
        ? ColumnConfig["hasDefault"] extends true
          ? Column
          : never
        : never;
    }[keyof Config["columns"]]
  : never;

type TablesDiff = {
  [TableName in keyof typeof tableMap]: {
    select: Diff<
      CamelKeysWithUnderscore<
        WithGeneratedColumns<
          TableName,
          Database["public"]["Tables"][TableName]["Row"]
        >
      >,
      (typeof tableMap)[TableName]["$inferSelect"]
    >;
    insert: Diff<
      CamelKeysWithUnderscore<
        PickPartial<
          WithGeneratedColumns<
            TableName,
            Database["public"]["Tables"][TableName]["Insert"]
          >,
          ColumnsWithDefaults<(typeof tableMap)[TableName]> &
            keyof Database["public"]["Tables"][TableName]["Insert"]
        >
      >,
      (typeof tableMap)[TableName]["$inferInsert"]
    >;
  } extends infer Diffed
    ? Diffed extends Record<"select" | "insert", never>
      ? never
      : Diffed
    : never;
};

type TableTest = Expect<
  Equal<TablesDiff, Record<keyof typeof tableMap, never>>
>;

const enumMap = {
  date_precision: datePrecisionEnum,
  keyset_status: statusEnum,
} satisfies {
  [K in keyof Database["public"]["Enums"]]: {
    readonly enumValues: Array<Database["public"]["Enums"][K]>;
  };
};
