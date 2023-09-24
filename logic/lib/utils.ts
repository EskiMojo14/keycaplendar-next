export const braidArrays = <T>(
  arr1: ReadonlyArray<T>,
  arr2: ReadonlyArray<T>,
) => {
  const result: Array<T> = [];
  let i = 0;
  for (i = 0; i < Math.min(arr1.length, arr2.length); i++) {
    result.push(arr1[i]!, arr2[i]!);
  }
  result.push(...arr1.slice(l), ...arr2.slice(l));
  return result;
};

export const noopTaggedTemplate = (
  strings: TemplateStringsArray,
  ...expressions: Array<unknown>
) => braidArrays(strings, expressions).join("");
