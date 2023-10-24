import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { forwardRef } from "react";
import { govukBem } from ".";

export interface PanelProps
  extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
  confirmation?: boolean;
  title: ReactNode;
}

export const panelClasses = govukBem("panel");

export default forwardRef<HTMLDivElement, PanelProps>(function Panel(
  { confirmation = false, title, className, children, ...props },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={panelClasses({
        modifiers: { confirmation },
        extra: className,
      })}
    >
      <h1 className={panelClasses("title")}>{title}</h1>
      <div className={panelClasses("body")}>{children}</div>
    </div>
  );
});
