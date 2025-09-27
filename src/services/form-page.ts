import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import { TFormState } from "types/form";

const useFormState = (initialForm: Record<string, string> = {}): [TFormState, Dispatch<SetStateAction<TFormState>>] => {

  const [formState, setFormState] = useState<TFormState>({
    error: false,
    sending: false,
    signalRef: useRef(),
    form: initialForm
  });


 return [formState, setFormState];
};


const handleFormInput = (e: FormEvent<HTMLFormElement>, formState: TFormState, setFormState: Dispatch<SetStateAction<TFormState>>) => {
  if(formState.error) {
    setFormState({...formState, error: false});
  }

  const target = e.target as HTMLInputElement;

  setFormState({
    ...formState, 
    form: { 
      ...formState.form,
      [target.name]: target.value
    } 
  });
}

export { useFormState, handleFormInput };
