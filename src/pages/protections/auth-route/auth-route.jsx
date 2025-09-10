import {  useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router";
import { getUser } from "services/actions/user-slice";
import { getCookie } from "services/utils";
import PropTypes from "prop-types";
import authSlice from "services/actions/auth-slice";

const AuthRoute = ({ children }) => {
  const { sending, loginError } = useSelector(store => store.auth);
  const { user } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const controllerRef = useRef(new AbortController());
  const location = useLocation();

  useLayoutEffect(() => {
    const controller = controllerRef.current;

    return () => {
      dispatch(authSlice.actions.resetSending());
      controller.abort();
    }
  }, [dispatch]);
  
  if(!!loginError) {
    return <Navigate to='/login' state={{path: location.pathname}} replace />;
  }

  let element = children;

  if(!getCookie('token') || !user) {
    element = <span>Загрузка...</span>;
    
    if(!sending) {
      dispatch(getUser(controllerRef.current.signal));
    }
  }
  
  return (
    <>
      {element}
    </>
  )
};

AuthRoute.propTypes = {
  children: PropTypes.element.isRequired
}

export default AuthRoute;