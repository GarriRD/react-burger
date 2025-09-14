import { handleFormInput, useFormState } from "services/form-page";
import userProfileStyles from './user-profile.module.css';
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notice from "components/notice/notice";
import { updateUser } from "services/actions/user-slice";


const resetStates = ({user, formState, setFormState, setFormChanged, setInputState}) => {
  setInputState({name: true, email: true, password: true});
  setFormState({...formState, form: {...user, password: ''}});
  setFormChanged(false);
};

const UserProfile = () => {
  const dispatch = useDispatch();

  const { user, refreshing, refreshError } = useSelector(store => store.user);
  const [formState, setFormState] = useFormState({ name: '', email: '', password: ''});
  const [formChanged, setFormChanged] = useState(false);
  const [inputsState, setInputState] = useState({
    name: true,
    email: true,
    password: true,
  });
  
  const handleInput = e => {
    if(!formChanged) {
      setFormChanged(true);
    }
    if(!(inputsState.password && e.target.name === 'password')) {
      handleFormInput(e, formState, setFormState);
    }
  };

  const handleIconClick = name => {
    setInputState({...inputsState, [name]: !inputsState[name]});
  };

  const handleSave = e => {
    e.preventDefault();
    let currentForm = formState.form;
    if(currentForm.password.length === 0) {
      currentForm = {name: currentForm.name, email: currentForm.email}
    }
    
    dispatch(updateUser([formState.form, formState.signalRef.current]));
  };

  const handleCancel = e => {
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
      />
      <Input 
        placeholder='Логин' 
        name='email' 
        icon="EditIcon"
        value={formState.form.email} 
        disabled={inputsState.email}
        onIconClick={() => handleIconClick('email')}
        defaultValue={user.email}
      />
      <PasswordInput
        placeholder='Пароль' 
        name='password' 
        value={inputsState.password ? '******' : formState.form.password}
        icon="EditIcon"
        disabled={inputsState.password}
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