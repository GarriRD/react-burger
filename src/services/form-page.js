import { useRef, useState } from "react";

const useFormState = (initialForm = {}) => {
 const [formState, setFormState] = useState({
  error: false,
  sending: false,
  signalRef: useRef(),
  form: initialForm
 });


 return [formState, setFormState];
};


const handleFormInput = (e, formState, setFormState) => {
  if(formState.error) {
    setFormState({...formState, error: false});
  }

  setFormState({
    ...formState, 
    form: { 
      ...formState.form,
      [e.target.name]: e.target.value
    } 
  });
}

export { useFormState, handleFormInput };
