import { produce } from "immer";
import type { z } from "zod";
import { safeAssign } from "./lib/utils";
import { zfd } from "zod-form-data";

export type ServerActionReducer<
  State,
  Payload = never,
  BoundArguments extends Array<any> = [],
> = (
  ...args: [Payload] extends [never]
    ? [...BoundArguments, state: State]
    : [...BoundArguments, state: State, payload: Payload]
) => Promise<State>;

export interface FormState<T = Record<string, unknown>> {
  formErrors?: Array<string>;
  fieldErrors?: { [K in keyof T]?: Array<string> };
  messages?: Array<string>;
}

export const mergeFormStates = (...states: Array<FormState>) =>
  produce({} as FormState, (draft) => {
    for (const state of states) {
      if (state.formErrors) {
        (draft.formErrors ??= []).push(...state.formErrors);
      }
      if (state.fieldErrors) {
        safeAssign((draft.fieldErrors ??= {}), state.fieldErrors);
      }
      if (state.messages) {
        (draft.messages ??= []).push(...state.messages);
      }
    }
  });

export const withSchema =
  <Shape extends object>(
    schema: z.ZodType<Shape, any, z.input<ReturnType<typeof zfd.formData>>>,
    reducer: ServerActionReducer<FormState<Shape>, Shape>,
  ): ServerActionReducer<FormState<Shape>, FormData> =>
  async (state, payload) => {
    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      return parsed.error.flatten();
    }
    // @ts-expect-error fun
    return reducer(state, parsed.data);
  };
