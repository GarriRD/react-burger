import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link, useNavigate } from "react-router";
import registerStyles from './register.module.css';
import { useEffect, useRef, useState } from "react";
import { register } from "services/auth";
import { handleFormInput, useFormState } from "services/form-page";

const Register = () => {
  const [formState, setFormState] = useFormState();
  const navigate = useNavigate();


  const handleInput = e => {
    handleFormInput(e, formState, setFormState);
  }

  const handleSubmit = async e => {
    
    e.preventDefault();
    const action = async () => {
      const res = await register(formState.form.name, formState.form.email, formState.form.password, formState.signalRef.current);
      
      if(res && res.success) {
        navigate('/login');
      } else {
        setFormState({ ...formState, sending: false, error: res.error });
      }
    }
    
    action();
    setFormState({ ...formState, sending: true});
  }

  useEffect(() => {
    const abortController = new AbortController();
    formState.signalRef.current = abortController.signal;

    return () => {
      abortController.abort();
    }
  }, []);

  return (
    <form className='form-page' onChange={handleInput} onSubmit={handleSubmit}>
      <span className="text text_type_main-large">Регистрация</span>
      {formState.error && <span className="text text_type_main-small" style={{color: 'red'}}>{formState.error}</span>}
      <Input placeholder={!formState.form.name && 'Имя'} type='text' name='name' />
      <Input placeholder={!formState.form.email && 'E-mail'} type='email' name='email' />
      <PasswordInput name='password' placeholder={!formState.form.password && 'Пароль'} />
      <Button type='primary' size="large" disabled={formState.sending}>Зарегистрироваться</Button>
      <span className={`${registerStyles.footer} text text_type_main-default form-link`}>Уже зарегистрировались?
        <Link to='/login'>Войти</Link>
      </span>
    </form>
  )
};

export default Register;