import { useCallback, useEffect, useState } from "react";

export const useLocalStorage = <T>(
  initial: T,
  key: string,
  {
    storageWindow = typeof window === "undefined" ? undefined : window,
    serialize = JSON.stringify,
    deserialize = JSON.parse as (serialized: string) => T,
  }: {
    storageWindow?: Window | null;
    serialize?: (item: T) => string;
    deserialize?: (serialized: string) => T;
  } = {},
) => {
  const [state, setState] = useState(() => {
    if (typeof window === "undefined") {
      return initial;
    }
    let value: T | undefined;
    try {
      const serialized = localStorage.getItem(key) ?? undefined;
      value = serialized ? deserialize(serialized) : undefined;
      if (!value) {
        localStorage.setItem(key, serialize(initial));
      }
    } catch (e) {
      // unsupported
    }
    return value ?? initial;
  });
  const setValue = useCallback((value: T) => {
    setState((currentState) => {
      if (value === currentState) return currentState;
      try {
        localStorage.setItem(key, serialize(value));
      } catch (e) {
        // unsupported
      }
      return value;
    });
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    storageWindow?.addEventListener(
      "storage",
      (event) => {
        const value = event.newValue;
        if (event.key === key) {
          setValue(value ? deserialize(value) : initial);
        }
      },
      { signal: abortController.signal },
    );
    return () => {
      abortController.abort();
    };
  });
  return [state, setValue] as const;
};
