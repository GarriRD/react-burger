import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, FormEvent, useLayoutEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import userSlice from "services/actions/user-slice";
import { fetchUser, login } from "services/auth";
import { handleFormInput, useFormState } from "services/form-page";
import { useAppDispatch } from "services/hooks";
import { setCookie } from "services/utils";

const Login: FC = () => {
  const [formState, setFormState] = useFormState({ email: '', password: ''}); 
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const action = async () => {
      const res = await login(formState.form.email, formState.form.password, formState.signalRef.current);

      if(res.success) {
        
        setCookie('token', res.accessToken, { expires: 20 * 60 });
        setCookie('refreshToken', res.refreshToken, { expires: 24 * 60 * 60 });
        
        const user = await fetchUser(res.accessToken, formState.signalRef.current);

        if(user.success) {
          const path = location.state && location.state.path ?  location.state.path : '/'
          
          dispatch(userSlice.actions.setUser(user.user));
          navigate(path, { replace: true });
        } else {
          setFormState({...formState, error: user.message, sending: false});  
        }
        
      } else {
        setFormState({...formState, error: res.message, sending: false});
      }

    };

    setFormState({...formState, sending: true});
    action();
  }

  const handleInput = (e: FormEvent<HTMLFormElement>) => {
    handleFormInput(e, formState, setFormState);
  }

  useLayoutEffect(() => {
    const abortController = new AbortController();
    formState.signalRef.current = abortController.signal;

    return () => {
      abortController.abort();
    }
  }, []);

  return (
    <form className='form-page' onSubmit={handleLogin} onChange={handleInput}>
      <span className="text text_type_main-large">Вход</span>
      {formState.error && <span className="text text_type_main-small error-msg">{formState.error}</span>}
      <Input 
        placeholder={!formState.form.email ? 'E-mail' : ''} 
        name='email' 
        value={formState.form.email} 
        onChange={() => null}
        onPointerEnterCapture={() => null}
        onPointerLeaveCapture={() => null}
      />
      <PasswordInput 
        name='password' 
        placeholder={!formState.form.password ? 'Пароль' : ''} 
        value={formState.form.password} 
        onChange={() => null}
      />
      <Button htmlType="submit" type='primary' size="large" disabled={formState.sending}>Войти</Button>
      <span className='form-link'>
        Вы — новый пользователь?
        <Link to='/register'>Зарегистрироваться</Link>
      </span>
      <span className='form-link'>
        Забыли пароль?
        <Link to='/forgot-password'>Восстановить пароль</Link>
      </span>
    </form>
  );
}

export default Login;