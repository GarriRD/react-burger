import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import tabOptionsStyles from './tab-options.module.css';
import { FC, MutableRefObject, useCallback } from 'react';
import ingredinetsSlice from 'services/actions/ingredients-slice';
import { ScrollPosition } from 'types/scroll';
import { useAppDispatch, useAppSelector } from 'services/hooks';
import { IngredientSectionName } from 'types';

const TabOptions: FC<{scrollRef: MutableRefObject<ScrollPosition | null> }> = ({scrollRef}) => {
  const currentSection = useAppSelector(store => store.ingredients.currentSection);
  const dispatch = useAppDispatch();
  const { setCurrentSection } = ingredinetsSlice.actions;

  // Если была выбрана секция то сохранённая позиция бегунка удаляется
  const dispatchCurrent = useCallback((sectionName: IngredientSectionName) => {
    scrollRef.current = null;
    dispatch(setCurrentSection(sectionName))

  }, [dispatch, setCurrentSection, scrollRef])

  return (
    <span className={tabOptionsStyles.tab}>
      <Tab value={'bun'} active={currentSection === 'bun'} onClick={() => dispatchCurrent('bun')} >Булки</Tab>
      <Tab value={'sauce'} active={currentSection === 'sauce'} onClick={() => dispatchCurrent('sauce')} >Соусы</Tab>
      <Tab value={'main'} active={currentSection === 'main'} onClick={() => dispatchCurrent('main')} >Начинка</Tab>
    </span>
  );
};

export default TabOptions;