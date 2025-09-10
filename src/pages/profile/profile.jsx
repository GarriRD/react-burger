import textStyles from 'styles/text.module.css';
import profileStyles from './profile.module.css';
import { NavLink, useNavigate } from 'react-router';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import authSlice from 'services/actions/auth-slice';
import PropTypes from 'prop-types';

const navLink = (link, text, extraClass) => {
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


const Profile = ({ children }) => {
  const dispatch = useDispatch();
  const tabClass = useMemo(() => `text text_type_main-medium ${profileStyles.tab}`, []);

  const handleLogout = () => {
    // для выхода устанавливается флаг который предотвратит возвращение в профиль после повторного логина
    sessionStorage.setItem('stateless', '1');
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

Profile.propTypes = {
  children: PropTypes.element.isRequired
}

export default Profile;