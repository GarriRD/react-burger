import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import tabOptionsStyles from './tab-options.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import ingredinetsSlice from 'store/ingredients/ingredients-slice';

const TabOptions = () => {
  const currentSection = useSelector(store => store.ingredients.currentSection);
  const dispatch = useDispatch();
  const { setCurrentSection } = ingredinetsSlice.actions;

  const dispatchCurrent = useCallback(sectionName => dispatch(setCurrentSection(sectionName)), [dispatch, setCurrentSection])

  return (
    <span className={tabOptionsStyles.tab}>
      <Tab value={'bun'} active={currentSection === 'bun'} onClick={dispatchCurrent} >Булки</Tab>
      <Tab value={'sauce'} active={currentSection === 'sauce'} onClick={dispatchCurrent} >Соусы</Tab>
      <Tab value={'main'} active={currentSection === 'main'} onClick={dispatchCurrent} >Начинка</Tab>
    </span>
  );
}

export default TabOptions;