import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import { govukBem } from ".";

const summaryCardClasses = govukBem("summary-card");

export default forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
  function SummaryCard({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        {...props}
        className={summaryCardClasses({ extra: className })}
      />
    );
  },
);

export const SummaryCardTitleWrapper = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(function SummaryCardTitleWrapper({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      {...props}
      className={summaryCardClasses("title-wrapper", undefined, className)}
    />
  );
});

export const SummaryCardTitle = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithoutRef<"h2">
>(function SummaryCardTitle({ className, ...props }, ref) {
  return (
    <h2
      ref={ref}
      {...props}
      className={summaryCardClasses("title", undefined, className)}
    />
  );
});

export const SummaryCardActions = forwardRef<
  HTMLUListElement,
  ComponentPropsWithoutRef<"ul">
>(function SummaryCardActions({ className, ...props }, ref) {
  return (
    <ul
      ref={ref}
      {...props}
      className={summaryCardClasses("actions", undefined, className)}
    />
  );
});

export const SummaryCardAction = forwardRef<
  HTMLLIElement,
  ComponentPropsWithoutRef<"li">
>(function SummaryCardAction({ className, ...props }, ref) {
  return (
    <li
      ref={ref}
      {...props}
      className={summaryCardClasses("action", undefined, className)}
    />
  );
});

export const SummaryCardContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(function SummaryCardContent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      {...props}
      className={summaryCardClasses("content", undefined, className)}
    />
  );
});
