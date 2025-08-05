import { BurgerIcon, ProfileIcon, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import headerOptionStyles from './header-option.module.css';
import textStyles from '../../../styles/text.module.css';

const iconTypeGetter = {
  'burger': BurgerIcon,
  'list': ListIcon,
  'profile': ProfileIcon
}

const HeaderOption = ({ iconAlias, iconType = 'primary', text, textType = 'primary' }) => {

  const HeaderIcon = iconTypeGetter[iconAlias];

  return (
    <span className={headerOptionStyles['header-option']}>
      <HeaderIcon type={iconType}/>
      <span className={`text text_type_main-default ${textStyles[textType]}`}>{text}</span>
    </span>
  );
}

export default HeaderOption;