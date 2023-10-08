import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import { govukBem } from ".";

const listClasses = govukBem("list");

type ListVariant = "bullet" | "number";

interface CommonListProps {
  spaced?: boolean;
}

export interface UnorderedListProps
  extends ComponentPropsWithoutRef<"ul">,
    CommonListProps {
  variant?: Exclude<ListVariant, "number">;
}

export interface OrderedListProps
  extends ComponentPropsWithoutRef<"ol">,
    CommonListProps {
  variant: "number";
}

export default forwardRef<
  HTMLUListElement & HTMLOListElement,
  UnorderedListProps | OrderedListProps
>(function List({ className, variant, spaced, ...props }, ref) {
  if (variant === "number")
    return (
      <ol
        ref={ref}
        {...props}
        className={listClasses({
          modifiers: [variant, spaced ? "spaced" : ""],
          extra: className,
        })}
      />
    );
  return (
    <ul
      ref={ref}
      {...props}
      className={listClasses({
        modifiers: [variant ?? "", spaced ? "spaced" : ""],
        extra: className,
      })}
    />
  );
});
