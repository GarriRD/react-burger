import { MutableRefObject } from "react";

export type TFormState = {
  error: boolean | string;
  sending: boolean;
  signalRef: MutableRefObject<AbortSignal | undefined>;
  form: {
    [key: string]: string;
  };
};