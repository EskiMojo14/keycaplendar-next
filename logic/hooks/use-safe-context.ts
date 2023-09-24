import { Context, useContext } from "react";

export const useSafeContext = <T>(context: Context<T | undefined>): T => {
  const value = useContext(context);
  if (typeof value === "undefined") {
    throw new Error(`${context.displayName} used outside of provider`);
  }
  return value;
};
