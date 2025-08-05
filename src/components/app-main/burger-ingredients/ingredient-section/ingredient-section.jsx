import Ingredient from "./ingredient/ingredient"
import ingredientSectionStyles from './ingredient-section.module.css';
import { v4 } from 'uuid';
import { useEffect } from "react";

const IngredientSection = (props) => {
  const sectionId = v4();

  useEffect(() => {

    if (props.current === props.type) {
      document.getElementById(sectionId).scrollIntoView();
    }
  });

  return (
    <div className={ingredientSectionStyles.wrapper} id={sectionId}>
      <h2>{props.title}</h2>
      
      <ul className={ingredientSectionStyles.ingredients}>
        {props.ingredientsData.map((item, i) => {
          return <Ingredient key={i} ingredientData={item} changeCount={props.changeCount}/>
        })}
      </ul>
    </div>
  );
}

export default IngredientSection;