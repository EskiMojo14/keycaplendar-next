import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import { govukBem } from ".";

const gridRowClasses = govukBem("grid-row");

export const GridRow = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(function GridRow({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      {...props}
      className={gridRowClasses({ extra: className })}
    />
  );
});

const gridColumnClasses = govukBem({
  name: "grid-column",
  modifierDelimiter: "-",
});

type ColumnSize =
  | "full"
  | "one-half"
  | "two-thirds"
  | "one-third"
  | "three-quarters"
  | "one-quarter";

export interface GridColumnProps extends ComponentPropsWithoutRef<"div"> {
  size: ColumnSize;
  desktop?: ColumnSize;
}

export const GridColumn = forwardRef<HTMLDivElement, GridColumnProps>(
  function GridColumn({ className, size, desktop, ...props }, ref) {
    return (
      <div
        ref={ref}
        {...props}
        className={gridColumnClasses({
          modifiers: {
            [size]: true,
            ...(desktop && { [desktop + "-from-desktop"]: true }),
          },
          extra: className,
        })}
      />
    );
  },
);

const widthContainerClasses = govukBem("width-container");

export const WidthContainer = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(function WidthContainer({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      {...props}
      className={widthContainerClasses({ extra: className })}
    />
  );
});

const mainWrapperClasses = govukBem("main-wrapper");

export interface MainWrapperProps extends ComponentPropsWithoutRef<"main"> {
  size?: "l";
}

export const MainWrapper = forwardRef<HTMLElement, MainWrapperProps>(
  function WidthContainer({ className, size, ...props }, ref) {
    return (
      <main
        ref={ref}
        {...props}
        className={mainWrapperClasses({ modifier: size, extra: className })}
      />
    );
  },
);
