import "@total-typescript/ts-reset";

export const noopTaggedTemplate = (
  strings: TemplateStringsArray,
  ...expressions: Array<unknown>
) => String.raw({ raw: strings }, expressions);

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

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function assertType<T>(input: unknown): asserts input is T {}

export const safeAssign: <T extends {}>(
  target: T,
  ...sources: Array<Partial<T>>
) => T = Object.assign;
