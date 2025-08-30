import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import selectedItemsSTyles from './selected-items.module.css';
import { useSelector } from "react-redux";
import { useCallback } from "react";
import IngredientItem from "./ingredient-item/ingredient-item";

const SelectedItems = () => {
  const { selectedBun, selectedIngredients} = useSelector(store => store.selectedIngredients);
  
  const makeIngredientElement = useCallback(ingredientItem => {
    return (
      <li key={ingredientItem.itemId}>
        <IngredientItem ingredientData={ingredientItem}/>
      </li>
    )
  }, [])

  return (
      <section className={selectedItemsSTyles.section}>
        <ul className={selectedItemsSTyles.selection}>
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