import ingredientDetailsStyles from './ingredient-details.module.css';
import textStyles from 'styles/text.module.css';
import Notice from 'components/notice/notice';
import { FC } from 'react';
import { IngredientDetailsProps } from './types';
import { useAppSelector } from 'services/hooks';

const IngredientDetails: FC<IngredientDetailsProps> = ({ id, standAlone = false }) => {
  const ingredients = useAppSelector(store => store.ingredients.ingredients);
  const ingredient = ingredients.filter(item => item._id === id);
  
  if(ingredient.length === 0) {
    return <span className={ingredientDetailsStyles.margin2}><Notice type={'error'} /></span>
  }
  
  const ingredientData = ingredient[0];

  const details = {
    'Калории, ккал': ingredientData.calories,
    'Белки, г': ingredientData.proteins,
    'Жиры. г': ingredientData.fat,
    'Углеводы. г': ingredientData.carbohydrates,
  }

  const headerClass = standAlone ? ingredientDetailsStyles['header-center'] : ingredientDetailsStyles['header-left']
  return (
    <div className={ingredientDetailsStyles.wrapper} >
      <span className={`text text_type_main-large ${headerClass}`}>Детали ингредиента</span>
      <span className={ingredientDetailsStyles.preview} >
        <img src={ingredientData.image_large} alt={`ingredient ${ingredientData.name}`} />
      </span>
      <span className={`${ingredientDetailsStyles.name} text text_type_main-default`}>
        {ingredientData.name}
      </span>
      <ul className={`${ingredientDetailsStyles.details} text text_type_main-default`}>
        {Object.entries(details).map(([key, value], i) => {
          return (
            <li className={ingredientDetailsStyles['details-item']} key={i}>
              <span className={textStyles.secondary}>{key}</span>
              <span className={textStyles.secondary}>{value}</span>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default IngredientDetails;