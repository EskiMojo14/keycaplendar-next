import { useDebugValue, useEffect, useRef, useState } from "react";
import type { FormState } from "../form";

/**
 * Returns the most recently updated state.
 *
 * **IMPORTANT: Amount of arguments should not change to avoid breaking the rule of hooks**
 */
export default function useLatestState(...states: Array<FormState>) {
  const lengthRef = useRef(states.length);
  if (states.length !== lengthRef.current) {
    throw new Error(
      "Amount of states passed to hook should not change during lifecycle",
    );
  }
  const [latestState, setLatestState] = useState<FormState>({});
  for (const state of states) {
    // we're ensuring that the length never changes, so the hooks will always be the same
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setLatestState(state);
    }, [state]);
  }
  useDebugValue(latestState);
  return latestState;
}
