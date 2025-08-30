import { useDrop } from 'react-dnd';
import burgerConstructorStyles from './burger-constructor.module.css';
import SelectedItems from "./selected-items/selected-items";
import Total from "./total/total";
import { useDispatch, useSelector } from 'react-redux';
import selectedIngredientsSlice from 'services/actions/selected-ingredients-slice';

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const selectionLoaded = useSelector(store => store.selectedIngredients.selectionLoaded);
  const highlight = useSelector(store => store.selectedIngredients.selectionHighlighted);
  const { setBun, addSelectedItem } = selectedIngredientsSlice.actions;

  const [, dropRef] = useDrop({
    accept: 'ingredient',
    drop(item) {
      
      const ingredientItem = item.ingredientData;
      ingredientItem.type === 'bun'
      ? dispatch(setBun(ingredientItem))
      : dispatch(addSelectedItem(ingredientItem));
    }
  })

  const borderClass = highlight ? burgerConstructorStyles.highlighted : ''

  return (
    <section className={`${burgerConstructorStyles.section} ${borderClass}`} ref={dropRef}>
      {selectionLoaded
      ? <>
          <SelectedItems />
          <Total />
        </>
      : null
      }
    </section>
  )
}

export default BurgerConstructor;