import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import { govukBem } from ".";

const summaryListClasses = govukBem("summary-list");

export interface SummaryListProps extends ComponentPropsWithoutRef<"dl"> {
  noBorder?: boolean;
}

export default forwardRef<HTMLDListElement, SummaryListProps>(
  function SummaryList({ className, noBorder = false, ...props }, ref) {
    return (
      <dl
        ref={ref}
        {...props}
        className={summaryListClasses({
          modifiers: { "no-border": noBorder },
          extra: className,
        })}
      />
    );
  },
);

export interface SummaryListRowProps extends ComponentPropsWithoutRef<"div"> {
  noBorder?: boolean;
  noActions?: boolean;
}

export const SummaryListRow = forwardRef<HTMLDivElement, SummaryListRowProps>(
  function SummaryListRow(
    { className, noActions = false, noBorder = false, ...props },
    ref,
  ) {
    return (
      <div
        ref={ref}
        {...props}
        className={summaryListClasses(
          "row",
          { "no-border": noBorder, "no-actions": noActions },
          className,
        )}
      />
    );
  },
);

export const SummaryListKey = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<"dt">
>(function SummaryListKey({ className, ...props }, ref) {
  return (
    <dt
      ref={ref}
      {...props}
      className={summaryListClasses("value", undefined, className)}
    />
  );
});

export const SummaryListValue = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<"dd">
>(function SummaryListValue({ className, ...props }, ref) {
  return (
    <dd
      ref={ref}
      {...props}
      className={summaryListClasses("value", undefined, className)}
    />
  );
});

export const SummaryListActions = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<"dd">
>(function SummaryListActions({ className, ...props }, ref) {
  return (
    <dd
      ref={ref}
      {...props}
      className={summaryListClasses("actions", undefined, className)}
    />
  );
});

export const SummaryListActionsList = forwardRef<
  HTMLUListElement,
  ComponentPropsWithoutRef<"ul">
>(function SummaryListActionsList({ className, ...props }, ref) {
  return (
    <ul
      ref={ref}
      {...props}
      className={summaryListClasses("actions-list", undefined, className)}
    />
  );
});

export const SummaryListActionsListItem = forwardRef<
  HTMLLIElement,
  ComponentPropsWithoutRef<"li">
>(function SummaryListActionsListItem({ className, ...props }, ref) {
  return (
    <li
      ref={ref}
      {...props}
      className={summaryListClasses("actions-list-item", undefined, className)}
    />
  );
});
