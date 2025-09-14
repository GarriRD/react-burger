import AppMain from "components/app-main/app-main";
import Notice from "components/notice/notice";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "services/actions/ingredients-slice";
import { Route, Routes, useLocation } from 'react-router';
import Login from 'pages/login/login';
import AppHeader from 'components/app-header/app-header';
import Register from 'pages/register/register';
import ForgotPassword from 'pages/forgot-password/forgot-password';
import ResetPassword from 'pages/reset-password/reset-password';
import Profile from 'pages/profile/profile';
import UserProfile from 'pages/profile/user-profile/user-profile';
import AuthRoute from 'pages/protections/auth-route/auth-route';
import UnauthRoute from 'pages/protections/unauth-route/unauch.route';
import Orders from 'pages/profile/orders/orders';
import NotFound from 'pages/not-found/not-found';
import IngredientTab from "pages/ingredient-tab/ingredient-tab";
import IngredientModal from "pages/ingredient-modal/ingredient-modal";

const App = () => {
  const dispatch = useDispatch();
  const { ingredientsLoad, ingredientsError } = useSelector(store => store.ingredients);
  const location = useLocation();

  useLayoutEffect(() => {
    const abortController = new AbortController();
    const abortSignal = abortController.signal;
    
    dispatch(getIngredients(abortSignal));
    
    return () => {
      abortController.abort();
    }
    
  }, [dispatch]);

  let appMain = <Notice type={'loading'} />

  if(!ingredientsLoad) {
    appMain = ingredientsError ? <Notice type={'error'} /> : <AppMain/>;
  }

  return (
    <>
      <AppHeader />
      <Routes>
        {!(location.state && location.state.modal) && <Route path='/ingredients/:id' element={<IngredientTab />} />}
        <Route path='/' element={appMain}>
          <Route path="ingredients/:id" element={<IngredientModal />}/>
        </Route>
        <Route path='/login' element={<UnauthRoute><Login /></UnauthRoute> } />
        <Route path='/register' element={<UnauthRoute><Register /></UnauthRoute>} />
        <Route path='/forgot-password' element={<UnauthRoute><ForgotPassword /></UnauthRoute>} />
        <Route path='/reset-password' element={<UnauthRoute><ResetPassword /></UnauthRoute>} />
        <Route path='/profile' element={
          <AuthRoute>
            <Profile>
              <UserProfile />
            </Profile>
          </AuthRoute>} />
        <Route path='/profile/orders' element={
          <AuthRoute>
            <Profile>
              <Orders />
            </Profile>  
          </AuthRoute>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;