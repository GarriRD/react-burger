import { useMemo } from "react";
import TabOptions from "./tab-options/tab-options";
import IngredientSection from "./ingredient-section/ingredient-section";
import burgerIngredientsStyles from './burger-ingredients.module.css';
import {  useSelector } from "react-redux";

const BurgerIngredients = () => {
  const ingredientsData = useSelector(store => store.ingredients.ingredients);

  const ingredientSections = useMemo(() => {
    const buns = ingredientsData.filter(item => item.type === 'bun');
    const sauces = ingredientsData.filter(item => item.type === 'sauce');
    const mains = ingredientsData.filter(item => item.type === 'main');

    const sections = [
      ['Булки', 'bun', buns],
      ['Соусы', 'sauce', sauces],
      ['Начинка', 'main', mains],
    ];

    return (
      <section  className={burgerIngredientsStyles['ingredient-section-wrapper']}>
        {sections.map((item, i) => {


          const sectionProps = {
            title: item[0],
            type: item[1],
            ingredientsData: item[2]
          };

          return <IngredientSection {...sectionProps} key={i} />  
        })}
      </section>
    );
  }, [ingredientsData]);

  return (
    <section className={burgerIngredientsStyles.section}>
      <TabOptions />
      {ingredientSections}
    </section>
  );
}

export default BurgerIngredients;

