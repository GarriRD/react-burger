import { BurgerIcon, ProfileIcon, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router";
import { FC } from "react";
import { HeaderOptionsProps } from "./types";
import headerOptionStyles from './header-option.module.css';
import textStyles from 'styles/text.module.css';

const iconTypeGetter = {
  'burger': BurgerIcon,
  'list': ListIcon,
  'profile': ProfileIcon
}

const HeaderOption: FC<HeaderOptionsProps> = ({ iconAlias, text, path, iconType = 'primary', textType = 'primary' }) => {
  
  const HeaderIcon = iconTypeGetter[iconAlias];
  
  return (
    <span className={headerOptionStyles['header-option']}>
      <HeaderIcon type={iconType} />
      <NavLink to={path} end className={headerOptionStyles.link}>
        {({isActive}) => {
          const activeClass = isActive ? headerOptionStyles.active : ''
          return (
            <span className={`text text_type_main-default ${textStyles[textType]} ${activeClass}`}>
              {text}
            </span>
          );
        }}
      </NavLink>
    </span>
  );
}

export default HeaderOption;