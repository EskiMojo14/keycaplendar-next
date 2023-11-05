import "@total-typescript/ts-reset";
import type { CamelCase } from "string-ts";

export type Id<T> = { [K in keyof T]: T[K] } & unknown;

export type RemoveIndexSignature<T> = {
  [K in keyof T as string extends K
    ? never
    : symbol extends K
    ? never
    : number extends K
    ? never
    : K]: T[K];
};

export type NoInfer<T> = [T][T extends any ? 0 : never];

export type DeepPartial<Thing> = Thing extends Function
  ? Thing
  : Thing extends Array<infer InferredArrayMember>
  ? DeepPartialArray<InferredArrayMember>
  : Thing extends object
  ? DeepPartialObject<Thing>
  : Thing | undefined;

type DeepPartialArray<Thing> = Array<DeepPartial<Thing>>;

type DeepPartialObject<Thing> = {
  [Key in keyof Thing]?: DeepPartial<Thing[Key]>;
};

export type Tail<T extends Array<unknown>> = T extends [unknown, ...infer Tail]
  ? Tail
  : never;

export type Satisfies<T extends U, U> = T;

export type Expect<T extends true> = T;

export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T,
>() => T extends Y ? 1 : 2
  ? true
  : false;

export type Diff<T, U> = Equal<T, U> extends true
  ? never
  : T extends object
  ? U extends object
    ? {
        onlyT: { [K in Exclude<keyof T, keyof U>]: T[K] };
        onlyU: {
          [K in Exclude<keyof U, keyof T>]: U[K];
        };
        shared: {
          [K in keyof (T | U) as [Diff<T[K], U[K]>] extends [never]
            ? never
            : K]-?: {
            diff: Diff<T[K], U[K]>;
            T: T[K];
            U: U[K];
          };
        };
      } extends infer Diffed extends Record<
        "onlyT" | "onlyU" | "shared",
        unknown
      >
      ? Equal<Diffed["onlyT" | "onlyU" | "shared"], {}> extends true
        ? never
        : Diffed
      : never
    : T | U
  : T | U;

export type PreserveLeadingUnderscore<T extends string> =
  T extends `_${infer U extends string}` ? `_${CamelCase<U>}` : CamelCase<T>;

export type CamelKeysWithUnderscore<T> = T extends []
  ? T
  : {
      [K in keyof T as PreserveLeadingUnderscore<Extract<K, string>>]: T[K];
    };

export type PickPartial<T, K extends keyof T> = Id<
  Omit<T, K> & Partial<Pick<T, K>>
>;
