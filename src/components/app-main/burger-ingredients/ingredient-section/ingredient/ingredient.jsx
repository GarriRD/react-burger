import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './ingredient.module.css';

const Ingredient = ({ ingredientData, changeCount }) => {
  return ( 
    <div className={ingredientStyles.wrapper} onClick={() => changeCount(ingredientData, 'increment') }>
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


export default Ingredient;