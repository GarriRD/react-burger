import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import userSlice from "services/actions/user-slice";
import { fetchUser, login } from "services/auth";
import { handleFormInput, useFormState } from "services/form-page";
import { setCookie } from "services/utils";

const Login = () => {
  const [formState, setFormState] = useFormState(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  
  const handleLogin = e => {
    e.preventDefault();
    const action = async () => {
      const res = await login(formState.form.email, formState.form.password, formState.signalRef.current);

      if(res.success) {
        
        setCookie('token', res.accessToken, { expires: 20 * 60 });
        setCookie('refreshToken', res.refreshToken, { expires: 24 * 60 * 60 });
        
        const user = await fetchUser(res.accessToken, formState.signalRef.current);

        if(user.success) {
          const path = location.state && location.state.path && !sessionStorage ?  location.state.path : '/'
          
          sessionStorage.removeItem('stateless');
          dispatch(userSlice.actions.setUser(user.user));
          navigate(path, { replace: true });
        } 

        res.message = 'Ошибка при авторизации аккаунта';
      } else {
        setFormState({...formState, error: res.message, sending: false});
      }

    };

    setFormState({...formState, sending: true});
    action();
  }

  const handleInput = e => {
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
      {formState.error && <span className="text text_type_main-small" style={{color: 'red'}}>{formState.error}</span>}
      <Input placeholder={!formState.form.email && 'E-mail'} text='text' name='email'/>
      <PasswordInput name='password' placeholder={!formState.form.password && 'Пароль'} />
      <Button type='primary' size="large" disabled={formState.sending}>Войти</Button>
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