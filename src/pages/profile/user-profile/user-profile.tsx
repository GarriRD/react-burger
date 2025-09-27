import { handleFormInput, useFormState } from "services/form-page";
import userProfileStyles from './user-profile.module.css';
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, FormEvent, useLayoutEffect, useState } from "react";
import Notice from "components/notice/notice";
import { updateUser } from "services/actions/user-slice";
import { InputStateFlags, ResetStateArgs } from "./types";
import { useAppDispatch, useAppSelector } from "services/hooks";


const resetStates = ({user, formState, setFormState, setFormChanged, setInputState}: ResetStateArgs) => {
  setInputState({name: true, email: true, password: true});
  setFormState({...formState, form: {...user, password: ''}});
  setFormChanged(false);
};

const UserProfile: FC = () => {
  const dispatch = useAppDispatch();

  const { refreshing, refreshError } = useAppSelector(store => store.user);
  const user = useAppSelector(store => store.user.user)!;
  const [formState, setFormState] = useFormState({ name: '', email: '', password: ''});
  const [formChanged, setFormChanged] = useState<boolean>(false);
  const [inputsState, setInputState] = useState<InputStateFlags>({
    name: true,
    email: true,
    password: true,
  });
  
  const handleInput = (e: FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement;

    if(!formChanged) {
      setFormChanged(true);
    }
    if(!(inputsState.password && target.name === 'password')) {
      handleFormInput(e, formState, setFormState);
    }
  };

  const handleIconClick = (name: keyof InputStateFlags) => {
    setInputState({...inputsState, [name]: !inputsState[name]});
  };

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let currentForm = formState.form;
    if(currentForm.password.length === 0) {
      currentForm = {name: currentForm.name, email: currentForm.email}
    }
    
    dispatch(updateUser({ userForm: formState.form, abortSignal: formState.signalRef.current! }));
  };

  const handleCancel = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetStates({user, formState, setFormState, setInputState, setFormChanged});
  };

  useLayoutEffect(() => {
    resetStates({user, formState, setFormState, setInputState, setFormChanged});
  }, [user])


  useLayoutEffect(() => {
    const controller = new AbortController();
    formState.signalRef.current = controller.signal;

    return () => {
      controller.abort();
    }
    
  }, []);

  if(refreshing) {
    return <Notice type={'loading'} />
  }

  return (
    <form className={userProfileStyles.wrapper} onChange={handleInput} onSubmit={handleSave} onReset={handleCancel}>
      {refreshError && <span className="text text_type_main-small error-msg" >{refreshError}</span>}
      <Input 
        placeholder='Имя' 
        name='name' 
        icon="EditIcon" 
        value={formState.form.name} 
        disabled={inputsState.name}
        onIconClick={() => handleIconClick('name')}
        defaultValue={user.name}
        onChange={() => null}
        onPointerEnterCapture={() => null}
        onPointerLeaveCapture={() => null}
      />
      <Input 
        placeholder='Логин' 
        name='email' 
        icon="EditIcon"
        value={formState.form.email} 
        disabled={inputsState.email}
        onIconClick={() => handleIconClick('email')}
        defaultValue={user.email}
        onChange={() => null}
        onPointerEnterCapture={() => null}
        onPointerLeaveCapture={() => null}
      />
      <PasswordInput
        placeholder='Пароль' 
        name='password' 
        value={inputsState.password ? '******' : formState.form.password}
        icon="EditIcon"
        disabled={inputsState.password}
        onChange={() => null}
        // @ts-ignore
        onIconClick={() => handleIconClick('password')}
        defaultValue={''}
      />
      {formChanged &&<div className={userProfileStyles.buttons}>
        <Button type="primary" htmlType="submit">Сохранить</Button>
        <Button type='primary' htmlType="reset">Отмена</Button>
      </div>}
    </form>
  );
};

export default UserProfile;