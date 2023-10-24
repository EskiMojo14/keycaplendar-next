import type { FieldValues, Path } from "react-hook-form";

export type PathObject<Namespace extends string, Shape extends FieldValues> = {
  [P in Path<Shape> as P extends "createdAt" ? never : P]: `${Namespace}.${P}`;
};

export type ServerActionReducer<
  State,
  Payload = never,
  BoundArguments extends Array<any> = [],
> = [Payload] extends [never]
  ? (...args: [...BoundArguments, state: State]) => Promise<State>
  : (
      ...args: [...BoundArguments, state: State, payload: Payload]
    ) => Promise<State>;
