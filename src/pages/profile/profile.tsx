import textStyles from 'styles/text.module.css';
import profileStyles from './profile.module.css';
import { NavLink } from 'react-router';
import { ReactNode, useMemo } from 'react';
import authSlice from 'services/actions/auth-slice';
import { useAppDispatch } from 'services/hooks';
import { FCWithChildren } from 'types/component';

const navLink = (link: string, text: string, extraClass: string): ReactNode => {
  return (
     <NavLink to={link} end>
      { ({isActive}) => {
          return (
            <span className={`${isActive ? textStyles.primary : textStyles.secondary} ${extraClass}`}>
              {text}
            </span>
          );
        }
      }
     </NavLink>
  );
};


const Profile: FCWithChildren = ({ children }) => {
  const dispatch = useAppDispatch();
  const tabClass = useMemo(() => `text text_type_main-medium ${profileStyles.tab}`, []);

  const handleLogout = () => {
    sessionStorage.setItem('logout', '1');
    dispatch(authSlice.actions.logout());
  }
  
  return (
    <div className={profileStyles.wrapper}>
      <div className={profileStyles.tabs}>
        {navLink('/profile', 'Профиль', tabClass)}
        {navLink('/profile/orders', 'История заказов', tabClass)}
        <span className={`${textStyles.secondary} ${tabClass}`} onClick={handleLogout}>Выход</span>
      </div>
      {children}
    </div>
  )
};

export default Profile;