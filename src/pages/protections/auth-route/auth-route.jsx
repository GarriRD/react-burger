import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router";
import { getUser } from "services/actions/user-slice";
import { deleteCookie, getCookie } from "services/utils";
import PropTypes from "prop-types";
import Notice from "components/notice/notice";
import authSlice from "services/actions/auth-slice";

const AuthRoute = ({ children }) => {
  const { sending, loginError } = useSelector(store => store.auth);
  const [logged, setLogged] = useState(false);
  const { user } = useSelector(store => store.user);
  const dispatch = useDispatch();
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

AuthRoute.propTypes = {
  children: PropTypes.element.isRequired
}

export default AuthRoute;