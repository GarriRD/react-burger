import { BurgerIcon, ProfileIcon, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import headerOptionStyles from './header-option.module.css';
import textStyles from '../../../styles/text.module.css';
import PropTypes from 'prop-types';

const iconTypeGetter = {
  'burger': BurgerIcon,
  'list': ListIcon,
  'profile': ProfileIcon
}

const HeaderOption = ({ iconAlias, text, iconType = 'primary', textType = 'primary' }) => {

  const HeaderIcon = iconTypeGetter[iconAlias];

  return (
    <span className={headerOptionStyles['header-option']}>
      <HeaderIcon type={iconType}/>
      <span className={`text text_type_main-default ${textStyles[textType]}`}>{text}</span>
    </span>
  );
}

HeaderOption.propTypes = {
  iconAlias: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  iconType: PropTypes.string,
  textType: PropTypes.string,
}

export default HeaderOption;