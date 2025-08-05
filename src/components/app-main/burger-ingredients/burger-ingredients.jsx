import TabOptions from "./tab-options/tab-options";

import { useMemo, useState } from "react";
import IngredientSection from "./ingredient-section/ingredient-section";

import burgerIngredientsStyles from './burger-ingredients.module.css';

const BurgerIngredients = ({ data, changeCount }) => {
  const [current, setCurrent] = useState('bun');

    const ingredientSections = useMemo(() => {
    const buns = data.filter(item => item.type === 'bun');
    const sauces = data.filter(item => item.type === 'sauce');
    const mains = data.filter(item => item.type === 'main');

    const sections = [
      ['Булки', 'bun', buns],
      ['Соусы', 'sauce', sauces],
      ['Начинка', 'main', mains],
    ];

    return (
      <section  className={burgerIngredientsStyles['ingredient-section-wrapper']}>
        {sections.map((item, i) => {


          const sectionProps = {
            changeCount: changeCount,
            setCurrent: setCurrent,
            current: current,
            title: item[0],
            type: item[1],
            ingredientsData: item[2]
          };

          return <IngredientSection {...sectionProps} key={i} />  
        })}
      </section>
    );
  }, [data, changeCount, current]);

  return (
    <section className={burgerIngredientsStyles.section}>
      <TabOptions current={current} setCurrent={setCurrent} />
      {ingredientSections}
    </section>
  );
}

export default BurgerIngredients;

