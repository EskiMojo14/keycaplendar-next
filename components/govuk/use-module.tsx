import type { RefObject } from "react";
import { useLayoutEffect, useRef } from "react";
import type { Tail } from "@/logic/lib/utils";

export const makeUseModule = <
  Ctor extends new (
    $module: HTMLElement,
    ...args: Array<any>
  ) => { init?(): void },
>(
  ctor: Ctor,
  hookName: string,
) => {
  const fnName = "use" + hookName;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return {
    [fnName](
      el: RefObject<HTMLElement>,
      ...tail: Tail<ConstructorParameters<Ctor>>
    ) {
      const instanceRef = useRef<InstanceType<Ctor>>();
      useLayoutEffect(() => {
        if (el.current && !instanceRef.current) {
          instanceRef.current = new ctor(
            el.current,
            ...tail,
          ) as InstanceType<Ctor>;
          instanceRef.current.init?.();
        }
      }, [el]);
    },
  }[fnName]!;
};
