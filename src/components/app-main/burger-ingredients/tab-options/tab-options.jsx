import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import tabOptionsStyles from './tab-options.module.css';
import PropTypes from 'prop-types';

const TabOptions = ({ current, setCurrent}) => {

  return (
    <span className={tabOptionsStyles.tab}>
      <Tab value={'bun'} active={current === 'bun'} onClick={setCurrent} >Булки</Tab>
      <Tab value={'sauce'} active={current === 'sauce'} onClick={setCurrent} >Соусы</Tab>
      <Tab value={'main'} active={current === 'main'} onClick={setCurrent} >Начинка</Tab>
    </span>
  );
}

TabOptions.propTypes = {
  current: PropTypes.string.isRequired,
  setCurrent: PropTypes.func.isRequired,
}

export default TabOptions;