import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './ingredient.module.css';
import { ingredientDataProp } from 'utils/props-types';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import selectedIngredientsSlice from 'services/actions/selected-ingredients-slice';
import { useNavigate } from 'react-router';

const Ingredient = ({ ingredientData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { highlightSwitch } = selectedIngredientsSlice.actions;
  
  
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: () => {
      dispatch(highlightSwitch());    
      return {ingredientData}
    },
    end: () => dispatch(highlightSwitch()),
  })

  const showModal = () => {
    navigate(`ingredients/${ingredientData._id}`, { 
      state: {
        modal: true,
      } 
    });
  }

  return ( 
    <div className={ingredientStyles.wrapper} onClick={showModal} ref={dragRef}>
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