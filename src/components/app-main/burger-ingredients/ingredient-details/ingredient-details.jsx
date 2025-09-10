import { useSelector } from 'react-redux';
import ingredientDetailsStyles from './ingredient-details.module.css';
import textStyles from 'styles/text.module.css';
import Notice from 'components/notice/notice';
import PropTypes from 'prop-types';

const IngredientDetails = ({ id, standAlone = false }) => {
  const ingredients = useSelector(store => store.ingredients.ingredients);
  const ingredient = ingredients.filter(item => item._id === id);
  
  if(ingredient.length === 0) {
    return <span style={{margin: '0 2vw'}}><Notice type={'error'} /></span>
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

IngredientDetails.propTypes = {
  id: PropTypes.string.isRequired,
  standAlone: PropTypes.bool,
}

export default IngredientDetails;