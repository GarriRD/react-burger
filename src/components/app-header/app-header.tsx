import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import appHeaderStyles from './app-header.module.css';
import HeaderOption from './header-option/header-option';
import { useNavigate } from 'react-router';
import { FC, useCallback } from 'react';

const AppHeader: FC = () => {
  const navigate = useNavigate();
  
  const handleClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    
    <header className={appHeaderStyles.header}>
      <nav className={appHeaderStyles['left-sided']}>
        <HeaderOption 
          iconAlias={'burger'} 
          iconType={'primary'} 
          text={'Конструктор'} 
          textType={'primary'} 
          path={'/'}
        />
        <HeaderOption 
          iconAlias={'list'} 
          iconType={'secondary'} 
          text={'Лента заказов'} 
          textType={'secondary'} 
          path={'/feed'}
        />
      </nav>
      <div className={`${appHeaderStyles['flex-wrap']} ${appHeaderStyles.selectable}`} onClick={handleClick}>
        <Logo />
      </div>
      <nav className={appHeaderStyles['right-sided']}>
        <HeaderOption 
          iconAlias={'profile'} 
          iconType={'secondary'} 
          text={'Личный кабинет'} 
          textType={'secondary'} 
          path={'/profile'}
        />
      </nav>
    </header>
  );
}

export default AppHeader;