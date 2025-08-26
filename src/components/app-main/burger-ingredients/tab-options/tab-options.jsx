import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import tabOptionsStyles from './tab-options.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import ingredinetsSlice from 'services/actions/ingredients-slice';
import PropTypes from 'prop-types';
import { scrollPosProp } from 'utils/props-types';

const TabOptions = ({scrollRef}) => {
  const currentSection = useSelector(store => store.ingredients.currentSection);
  const dispatch = useDispatch();
  const { setCurrentSection } = ingredinetsSlice.actions;

  // Если была выбрана секция то сохранённая позиция бегунка удаляется
  const dispatchCurrent = useCallback(sectionName => {
    scrollRef.current = null;
    dispatch(setCurrentSection(sectionName))

  }, [dispatch, setCurrentSection, scrollRef])

  return (
    <span className={tabOptionsStyles.tab}>
      <Tab value={'bun'} active={currentSection === 'bun'} onClick={dispatchCurrent} >Булки</Tab>
      <Tab value={'sauce'} active={currentSection === 'sauce'} onClick={dispatchCurrent} >Соусы</Tab>
      <Tab value={'main'} active={currentSection === 'main'} onClick={dispatchCurrent} >Начинка</Tab>
    </span>
  );
}

TabOptions.propTypes = {
  scrollRef: PropTypes.oneOfType([
    PropTypes.func,
    scrollPosProp
  ]).isRequired
}

export default TabOptions;