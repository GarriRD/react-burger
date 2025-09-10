import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router";
import forgotPasswordStyles from './forgot-password.module.css';
import { useLayoutEffect } from "react";
import { forgotPasswordCode } from "services/auth";
import { setCookie } from "services/utils";
import { handleFormInput, useFormState } from "services/form-page";

const ForgotPassword = () => {
  const [formState, setFormState] = useFormState();
  const navigate = useNavigate();


  const handleInput = e => {
    handleFormInput(e, formState, setFormState);
  }

  const handleSend = e => {
    e.preventDefault();
    const action = async () => {
      const res = await forgotPasswordCode(formState.form.email, formState.signalRef.current);

      if(res && res.success) {
        // ограничение по времени, после которого ссылка изменения паполя будет неактивна
        setCookie('reset-flag', '1', { expires: 300 })
        navigate('/reset-password', { replace: true });
      }

      setFormState({ ...formState, error: res.message, sending: false });
    }
    action()
    setFormState({ ...formState, sending: true });
  }

  useLayoutEffect(() => {
    const abortController = new AbortController();
    formState.signalRef.current = abortController.signal;

    return () => {
      abortController.abort();  
    }
  }, []);



  return (
    <form className="form-page" onChange={handleInput} onSubmit={handleSend}>
      <span className="text text_type_main-large">Восстановление пароля</span>
      {formState.error && <span className="text text_type_main-small" style={{color: 'red'}}>{formState.error}</span>}
      <Input placeholder={!formState.form.email && 'Укажите E-mail'} text='text' name='email' />
      <Button type='primary' size="large" disabled={formState.sending} >Восстановить</Button>
      <span className={`${forgotPasswordStyles.footer} form-link`}>
        <span className="text text_type_main-default">Вспомнили пароль?</span>
        <Link to='/login'>Войти</Link>
      </span>
    </form>
  )
}

export default ForgotPassword;