import { useMemo, useState } from "react";
import PropTypes from 'prop-types';
import TabOptions from "./tab-options/tab-options";
import IngredientSection from "./ingredient-section/ingredient-section";
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { ingredientDataProp } from "utils/props-types";

const BurgerIngredients = ({ data }) => {
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
  }, [data, current]);

  return (
    <section className={burgerIngredientsStyles.section}>
      <TabOptions current={current} setCurrent={setCurrent} />
      {ingredientSections}
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientDataProp).isRequired,
}

export default BurgerIngredients;

