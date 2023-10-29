import { useFormState } from "react-dom";
import type { FormState, ServerActionReducer } from "../form";
import type { FormStepProps } from "@/components/form";
import type { InputFormGroupProps } from "@/components/govuk/input";

interface UseFormReturn<State, Payload = never> {
  state: FormState<State>;
  dispatch: (
    ...args: [Payload] extends [never] ? [] : [payload: Payload]
  ) => void;
  getFormStepProps: () => {
    state: FormState<State>;
    action: (
      ...args: [Payload] extends [never] ? [] : [payload: Payload]
    ) => void;
    namespace: string;
  };
  getFieldProps: (name: keyof State & string) => {
    name: string;
    id: string;
    error: boolean;
    errorMessage?: string;
  };
}

export default function useFormStep<State>(
  action: ServerActionReducer<FormState<State>>,
  initialState: FormState<State>,
  namespace: string,
  permalink?: string,
): UseFormReturn<State>;
export default function useFormStep<State, Payload>(
  action: ServerActionReducer<FormState<State>, Payload>,
  initialState: FormState<State>,
  namespace: string,
  permalink?: string,
): UseFormReturn<State, Payload>;
export default function useFormStep(
  action: ServerActionReducer<FormState<any>, any>,
  initialState: FormState<any>,
  namespace: string,
  permalink?: string,
) {
  const [state, dispatch] = useFormState(action, initialState, permalink);
  function getFormStepProps() {
    return {
      state,
      action: dispatch as any,
      namespace,
    } satisfies FormStepProps;
  }
  function getFieldProps(name: string) {
    return {
      name,
      id: `${namespace}.${name}`,
      error: !!state.fieldErrors?.[name],
      errorMessage: state.fieldErrors?.[name]?.join("\n"),
    } satisfies Partial<InputFormGroupProps>;
  }
  return {
    state,
    dispatch,
    getFormStepProps,
    getFieldProps,
  } satisfies UseFormReturn<any, any> as any;
}
