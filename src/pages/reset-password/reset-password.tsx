import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate, Navigate } from "react-router";
import resetPasswordStyles from './reset-password.module.css';
import { FC, FormEvent, useEffect } from "react";
import { passwordReset } from "services/auth";
import { deleteCookie, getCookie } from "services/utils";
import { handleFormInput, useFormState } from "services/form-page";

const ResetPassword: FC = () => {
  const [formState, setFormState] = useFormState({ password: '', token: '' });
  const navigate = useNavigate();
  const resetFlag = getCookie('reset-flag');
  


  const handleInput = (e: FormEvent<HTMLFormElement>) => {
    handleFormInput(e, formState, setFormState);
  }

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
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
      {formState.error && <span className="text text_type_main-small error-msg">{formState.error}</span>}
      <PasswordInput 
        placeholder={!formState.form.password ? 'Введите новый пароль' : ''} 
        name='password' value={formState.form.password}
        onChange={() => null}
      />
      <Input 
        placeholder={!formState.form.token ? 'Введите код из письма' : ''} 
        name='token' 
        value={formState.form.token}
        onChange={() => null}
        onPointerEnterCapture={() => null}
        onPointerLeaveCapture={() => null}
      />
      <Button htmlType="submit" type='primary' size="large" disabled={formState.sending} >Сохранить</Button>
      <span className={`${resetPasswordStyles.footer} form-link`}>
        <span className="text text_type_main-default">Вспомнили пароль?</span>
        <Link to='/login'>Войти</Link>
      </span>
    </form>
  )
}

export default ResetPassword;