import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import selectedItemsSTyles from './selected-items.module.css';
import textStyles from 'styles/text.module.css';
import IngredientItem from "./ingredient-item/ingredient-item";
import { FC } from "react";
import { useAppSelector } from "services/hooks";
import { TSelectedIngredient } from "types";

const SelectedItems: FC = () => {
  const { selectedBun, selectedIngredients } = useAppSelector(store => store.selectedIngredients);
  
  const makeIngredientElement = (ingredientItem: TSelectedIngredient) => {
    return (
      <li key={ingredientItem.itemId}>
        <IngredientItem ingredientData={ingredientItem}/>
      </li>
    )
  }

  return (
      <section className={selectedItemsSTyles.section}>
        <ul className={selectedItemsSTyles.selection}>
          {!selectedBun && <li className={`text text_type_main-small ${selectedItemsSTyles.notice} ${textStyles.secondary}`}>
            Пожалуйста, выберите булку
          </li>}
          <li key={-1} className={selectedItemsSTyles.padded}>
            {selectedBun && <ConstructorElement 
              isLocked={true} 
              type='top' 
              text={`${selectedBun.name} (верх)`} 
              price={selectedBun.price} 
              thumbnail={selectedBun.image} 
            />}
          </li>
          
          {selectedIngredients.map((item, i) => makeIngredientElement(item))}

          <li key={-2} className={selectedItemsSTyles.padded}>
            {selectedBun && <ConstructorElement 
              isLocked={true} 
              type='bottom' 
              text={`${selectedBun.name} (низ)`} 
              price={selectedBun.price} 
              thumbnail={selectedBun.image}
            />}
          </li>
        </ul>
      </section>
    );
}


export default SelectedItems;