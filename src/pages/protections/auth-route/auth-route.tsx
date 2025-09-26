import {  useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { getUser } from "services/actions/user-slice";
import { deleteCookie, getCookie } from "services/utils";
import Notice from "components/notice/notice";
import authSlice from "services/actions/auth-slice";
import { useAppDispatch, useAppSelector } from "services/hooks";
import { FCWithChildren } from "types/component";

const AuthRoute: FCWithChildren = ({ children }) => {
  const { sending, loginError } = useAppSelector(store => store.auth);
  const { user } = useAppSelector(store => store.user);
  const [logged, setLogged] = useState<boolean>(false);
  
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    
    if(!!sessionStorage.getItem('logout')) {
      sessionStorage.removeItem('logout');
      navigate('/login');
    } else if(!getCookie('token') || !user) {
      if(!!loginError) {
        deleteCookie('token');
        deleteCookie('refreshToken');
        navigate('/login', { state: { path: location.pathname } });
        
      } else if(!sending) {
        dispatch(authSlice.actions.setSending(true));
        dispatch(getUser());
      }
    } else {
      setLogged(true);
    }
    
  }, [sending, loginError, user, navigate, dispatch, location.pathname]);
  
  return (
    <>
      {!sessionStorage.getItem('logout') && logged 
        ? <>{children}</>
        : <Notice type='loading' />
      }
    </>
  )
};

export default AuthRoute;