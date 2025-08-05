import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import appHeaderStyles from './app-header.module.css';
import HeaderOption from './header-option/header-option.jsx';

const AppHeader = () => {
  return (
    
    <header className={appHeaderStyles.header}>
      <nav className={appHeaderStyles['left-sided']}>
        <HeaderOption iconAlias={'burger'} iconType={'primary'} text={'Конструктор'} textType={'primary'}/>
        <HeaderOption iconAlias={'list'} iconType={'secondary'} text={'Лента заказов'} textType={'secondary'}/>
      </nav>
      <div className={appHeaderStyles['flex-wrap']}>
        <Logo />
      </div>
      <nav className={appHeaderStyles['right-sided']}>
        <HeaderOption iconAlias={'profile'} iconType={'secondary'} text={'Личный кабинет'} textType={'secondary'}/>
      </nav>
    </header>
  );
}

export default AppHeader;