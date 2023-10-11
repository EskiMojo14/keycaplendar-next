import type { ForwardedRef, ReactNode, RefAttributes } from "react";
import { forwardRef } from "react";

// Declare a type that works with
// generic components
type FixedForwardRef = <T, P = {}>(
  render: (props: P, ref: ForwardedRef<T>) => ReactNode,
) => (props: P & RefAttributes<T>) => ReactNode;

// Cast the old forwardRef to the new one
export const forwardGenericRef = forwardRef as FixedForwardRef;
