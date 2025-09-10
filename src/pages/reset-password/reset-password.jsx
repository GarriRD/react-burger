import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate, Navigate } from "react-router";
import resetPasswordStyles from './reset-password.module.css';
import { useEffect } from "react";
import { passwordReset } from "services/auth";
import { deleteCookie, getCookie } from "services/utils";
import { handleFormInput, useFormState } from "services/form-page";

const ResetPassword = () => {
  const [formState, setFormState] = useFormState();
  const navigate = useNavigate();
  const resetFlag = getCookie('reset-flag');
  


  const handleInput = e => {
    handleFormInput(e, formState, setFormState);
  }

  const handleSave = e => {
    e.preventDefault();
    const action = async () => {
      const res = await passwordReset(formState.form.password, formState.form.token);

      if(res && res.success) {
        deleteCookie('reset-flag');
        navigate('/login', { replace: true });
      }

      setFormState({ ...formState, error: res.message, sending: false });
    }
    action()
    setFormState({ ...formState, sending: true });
  }

  useEffect(() => {
    const abortController = new AbortController();
    formState.signalRef.current = abortController.signal;

    return () => {
      abortController.abort();  
    }
  }, []);

  if(!resetFlag) {
    return <Navigate to={'/login'} replace />
  }
  
  return (  
    <form className="form-page" onChange={handleInput} onSubmit={handleSave}>
      <span className="text text_type_main-large">Восстановление пароля</span>
      {formState.error && <span className="text text_type_main-small" style={{color: 'red'}}>{formState.error}</span>}
      <PasswordInput placeholder={!formState.form.password && 'Введите новый пароль'} text='text' name='password' />
      <Input placeholder={!formState.form.token && 'Введите код из письма'} text='text' name='token' />
      <Button type='primary' size="large" disabled={formState.sending} >Сохранить</Button>
      <span className={`${resetPasswordStyles.footer} form-link`}>
        <span className="text text_type_main-default">Вспомнили пароль?</span>
        <Link to='/login'>Войти</Link>
      </span>
    </form>
  )
}

export default ResetPassword;