import { useDrop } from 'react-dnd';
import burgerConstructorStyles from './burger-constructor.module.css';
import SelectedItems from "./selected-items/selected-items";
import Total from "./total/total";
import selectedIngredientsSlice from 'services/actions/selected-ingredients-slice';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'services/hooks';
import { DropPayload } from './types';

const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();

  const selectionLoaded = useAppSelector(store => store.selectedIngredients.selectionLoaded);
  const highlight = useAppSelector(store => store.selectedIngredients.selectionHighlighted);
  const { setBun, addSelectedItem } = selectedIngredientsSlice.actions;

  const [, dropRef] = useDrop<DropPayload, void, void>({
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
    <section className={`${burgerConstructorStyles.section} ${borderClass}`} ref={dropRef} data-testid='burger-constructor'>
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