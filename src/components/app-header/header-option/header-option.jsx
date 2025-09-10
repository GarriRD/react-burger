import { BurgerIcon, ProfileIcon, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import headerOptionStyles from './header-option.module.css';
import textStyles from '../../../styles/text.module.css';
import PropTypes from 'prop-types';
import { Link, NavLink } from "react-router";

const iconTypeGetter = {
  'burger': BurgerIcon,
  'list': ListIcon,
  'profile': ProfileIcon
}

const HeaderOption = ({ iconAlias, text, path, iconType = 'primary', textType = 'primary' }) => {
  const HeaderIcon = iconTypeGetter[iconAlias];
  
  return (
    <span className={headerOptionStyles['header-option']}>
      <HeaderIcon type={iconType}/>
      <NavLink to={path} end>
        {({isActive}) => {
          const activeClass = isActive ? headerOptionStyles.active : ''
          return (
            <span className={`text text_type_main-default ${textStyles[textType]} ${activeClass}`}>
              <Link to={path} className={`${headerOptionStyles.link}`}>{text}</Link>
            </span>
          );
        }}
      </NavLink>
    </span>
  );
}

HeaderOption.propTypes = {
  iconAlias: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  iconType: PropTypes.string,
  textType: PropTypes.string,
}

export default HeaderOption;