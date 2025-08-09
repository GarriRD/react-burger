import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './ingredient.module.css';
import { useState } from 'react';
import IngredientDetails from './ingredient-details/ingredient-details';
import { ingredientDataProp } from 'utils/props-types';

const Ingredient = ({ ingredientData }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const ingredientDetails = isVisible && <IngredientDetails ingredientData={ingredientData} setIsVisible={setIsVisible} />

  return ( 
    <div className={ingredientStyles.wrapper} onClick={() => setIsVisible(true)}>
      {ingredientDetails}
      <span className={ingredientStyles.preview} style={{backgroundImage: `url(${ingredientData.image})`}}>
        {ingredientData.count > 0 && <Counter count={ingredientData.count} size='default'/>}
      </span>
      <span className={`${ingredientStyles.price} text text_type_main-default`}>
        {ingredientData.price}
        <CurrencyIcon type={'primary'} />
      </span>
      <span className={`${ingredientStyles.name} text text_type_main-default`}>
        {ingredientData.name}
      </span>
    </div>
  );
}

Ingredient.propTypes = {
  ingredientData: ingredientDataProp.isRequired,
}


export default Ingredient;