import { deepmerge } from "@mui/utils";
import type { SxProps as NextSxProps } from "@mui/material-next/styles";
import type { SxProps, Theme } from "@mui/material/styles";
import "@total-typescript/ts-reset";

export const castSx = (sx: NextSxProps) => sx as SxProps<Theme>;

export const braidArrays = <T>(
  arr1: ReadonlyArray<T>,
  arr2: ReadonlyArray<T>,
) => {
  const result: Array<T> = [];
  let i = 0;
  const l = Math.min(arr1.length, arr2.length);
  for (i = 0; i < l; i++) {
    result.push(arr1[i]!, arr2[i]!);
  }
  result.push(...arr1.slice(l), ...arr2.slice(l));
  return result;
};

export const noopTaggedTemplate = (
  strings: TemplateStringsArray,
  ...expressions: Array<unknown>
) => braidArrays(strings, expressions).join("");

export const safeDeepAssign = <T>(target: T, source: DeepPartial<NoInfer<T>>) =>
  deepmerge(target, source, { clone: false });

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
