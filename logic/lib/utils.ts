export const braidArrays = <T>(
  arr1: ReadonlyArray<T>,
  arr2: ReadonlyArray<T>,
) => {
  const result: T[] = [];
  let i,
    l = Math.min(arr1.length, arr2.length);
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
