"use client";
import { noopTaggedTemplate as css } from "@/logic/lib/utils";
import styled from "@emotion/styled";
import clsx from "clsx";
import type { CSSProperties, ComponentPropsWithoutRef } from "react";

interface SymbolProps extends ComponentPropsWithoutRef<"i"> {
  fontSize?: CSSProperties["fontSize"];
}

export default styled(
  ({ className, ...props }: SymbolProps) => (
    <i {...props} className={clsx("material-symbols-rounded", className)} />
  ),
  {
    shouldForwardProp: (prop) => prop !== "fontSize",
  },
)(
  (props) => css`
    font-size: ${props.fontSize};
  `,
);
