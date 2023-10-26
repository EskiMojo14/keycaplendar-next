export type ServerActionReducer<
  State,
  Payload = never,
  BoundArguments extends Array<any> = [],
> = (
  ...args: [Payload] extends [never]
    ? [...BoundArguments, state: State]
    : [...BoundArguments, state: State, payload: Payload]
) => Promise<State>;

export interface FormState {
  formErrors?: Array<string>;
  fieldErrors?: Record<string, Array<string>>;
}
