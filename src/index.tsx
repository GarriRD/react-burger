import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app.jsx';


import { Provider } from 'react-redux';
import store from 'services/actions';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, BrowserRouter as Router, Routes } from 'react-router';
import Login from 'pages/login/login';
import AppHeader from 'components/app-header/app-header';
import Register from 'pages/register/register';
import ForgotPassword from 'pages/forgot-password/forgot-password';
import ResetPassword from 'pages/reset-password/reset-password';
import Profile from 'pages/profile/profile';
import UserProfile from 'pages/profile/user-profile/user-profile';
import AuthRoute from 'pages/protections/auth-route/auth-route';
import UnauthRoute from 'pages/protections/unauth-route/unauch.route';
import IngredientSwitch from 'pages/protections/ingredient-switch/ingredient-switch';
import Orders from 'pages/profile/orders/orders';
import NotFound from 'pages/not-found/not-found';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <Router>
          <AppHeader />
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='ingredients/:id' element={<IngredientSwitch />} />
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
        </Router>
      </Provider>
    </DndProvider>
  </React.StrictMode>
);
