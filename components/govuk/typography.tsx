import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import { govukBem } from ".";

interface HeadingProps extends ComponentPropsWithoutRef<"h1"> {
  size: "xl" | "l" | "m" | "s";
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const headingClasses = govukBem({ name: "heading", modifierDelimiter: "-" });

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading({ className, tag: Tag = "h1", size, ...props }, ref) {
    return (
      <Tag
        ref={ref}
        {...props}
        className={headingClasses({ modifier: size, extra: className })}
      />
    );
  },
);

interface CaptionProps extends ComponentPropsWithoutRef<"h1"> {
  size: "xl" | "l" | "m" | "s";
}

const captionClasses = govukBem({ name: "caption", modifierDelimiter: "-" });

export const Caption = forwardRef<HTMLSpanElement, CaptionProps>(
  function Caption({ className, size, ...props }, ref) {
    return (
      <span
        ref={ref}
        {...props}
        className={captionClasses({ modifier: size, extra: className })}
      />
    );
  },
);

const bodyClasses = govukBem({ name: "body", modifierDelimiter: "-" });

interface BodyProps extends ComponentPropsWithoutRef<"h1"> {
  size: "xl" | "l" | "m" | "s";
  lead?: boolean;
}

export const Body = forwardRef<HTMLParagraphElement, BodyProps>(
  function Caption({ className, size, lead, ...props }, ref) {
    return (
      <p
        ref={ref}
        {...props}
        className={bodyClasses({
          modifiers: [size, lead ? "lead" : ""],
          extra: className,
        })}
      />
    );
  },
);
