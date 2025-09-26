import { FC, useLayoutEffect, useMemo, useRef } from "react";
import TabOptions from "./tab-options/tab-options";
import IngredientSection from "./ingredient-section/ingredient-section";
import burgerIngredientsStyles from './burger-ingredients.module.css';
import selectedIngredientsSlice from "services/actions/selected-ingredients-slice";
import { Outlet } from "react-router";
import { useAppDispatch, useAppSelector } from "services/hooks";
import { IngredientSectionName, TIngredientItem } from "types";
import { ScrollPosition } from "types/scroll";
import { ConstructorState } from "types/ingredients-constructor";

const BurgerIngredients: FC = () => {
  const dispatch = useAppDispatch();

  const ingredientsData = useAppSelector(store => store.ingredients.ingredients);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<ScrollPosition | null>(null);


  const ingredientSections = useMemo(() => {
    const buns = ingredientsData.filter(item => item.type === 'bun');
    const sauces = ingredientsData.filter(item => item.type === 'sauce');
    const mains = ingredientsData.filter(item => item.type === 'main');

    const sections: ReadonlyArray<[string, IngredientSectionName, TIngredientItem[]]> = [
      ['Булки', 'bun', buns],
      ['Соусы', 'sauce', sauces],
      ['Начинка', 'main', mains],
    ];

    return (
      <section  className={burgerIngredientsStyles['ingredient-section-wrapper']} ref={sectionRef}>
        {sections.map((item, i) => {


          const sectionProps = {
            title: item[0],
            type: item[1],
            ingredientsData: item[2],
            sectionRef,
            scrollRef
          };

          return <IngredientSection {...sectionProps} key={i} />  
        })}
      </section>
    );
  }, [ingredientsData]);

  useLayoutEffect(() => {
    const constructorStateItem = sessionStorage.getItem('constructorState');
    
    if(!!constructorStateItem) {
      const constructorState: ConstructorState = JSON.parse(constructorStateItem);
      dispatch(selectedIngredientsSlice.actions.setFromState(constructorState));
    }

  }, [dispatch]);

  return (
    <section className={burgerIngredientsStyles.section}>
      <Outlet />
      <TabOptions scrollRef={scrollRef} />
      {ingredientSections}
    </section>
  );
}

export default BurgerIngredients;

