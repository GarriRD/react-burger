import Ingredient from "./ingredient/ingredient"
import ingredientSectionStyles from './ingredient-section.module.css';
import { useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import { ingredientDataProp } from "utils/props-types";

const IngredientSection = (props) => {
  // заменил id на ref
  const sectionRef = useRef();
  
  useEffect(() => {

    if (props.current === props.type) {
      sectionRef.current.scrollIntoView()
    }
  });

  return (
    <div className={ingredientSectionStyles.wrapper} ref={sectionRef}>
      <h2 className={'text text_type_main-large'} >{props.title}</h2>
      
      <ul className={ingredientSectionStyles.ingredients}>
        {props.ingredientsData.map((item, i) => {
          return <Ingredient key={i} ingredientData={item} />
        })}
      </ul>
    </div>
  );
}

IngredientSection.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  ingredientsData: PropTypes.arrayOf(ingredientDataProp).isRequired,
}

export default IngredientSection;