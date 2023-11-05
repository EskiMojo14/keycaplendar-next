export const noopTaggedTemplate = (
  strings: TemplateStringsArray,
  ...expressions: Array<unknown>
) => String.raw({ raw: strings }, expressions);

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function assertType<T>(input: unknown): asserts input is T {}

export const safeAssign: <T extends {}>(
  target: T,
  ...sources: Array<Partial<T>>
) => T = Object.assign;
