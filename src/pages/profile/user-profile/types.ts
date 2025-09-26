import { Dispatch, SetStateAction } from "react";
import { UserForm } from "types"
import { TFormState } from "types/form";

export type InputStateFlags = {
  name: boolean;
  email: boolean;
  password: boolean;
}

export type ResetStateArgs = {
  user: UserForm;
  formState: TFormState;
  setFormState: Dispatch<SetStateAction<TFormState>>;
  setFormChanged: Dispatch<SetStateAction<boolean>>;
  setInputState: Dispatch<SetStateAction<InputStateFlags>>;
}