import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import selectedIngredientsSlice from "services/actions/selected-ingredients-slice";
import { TSelectedIngredient } from "types";
import { IngredientItemProps } from "./types";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "services/hooks";

const IngredientItem: FC<IngredientItemProps> = ({ ingredientData }) => {
  const dispatch = useAppDispatch();
  const selectedIngredients = useAppSelector(store => store.selectedIngredients.selectedIngredients);
  const { setSelectedIngredients, removeSelectedItem } = selectedIngredientsSlice.actions;

  const [{isDrag}, dragRef] = useDrag<TSelectedIngredient, void, { isDrag: boolean }>({
    type: 'ingredientItem',
    item: ingredientData,
    collect: monitor => ({
      isDrag: monitor.isDragging(),
    })
  })
  

  const [{isHover}, dropRef] = useDrop<TSelectedIngredient, void, { isHover: boolean }>({
    accept: 'ingredientItem',
    drop(item) {
      const newOrder = selectedIngredients.map(orderItem => {
        return (
          orderItem.itemId === item.itemId
          ? ingredientData
          : orderItem.itemId === ingredientData.itemId
          ? item
          : orderItem
        )
      })

      dispatch(setSelectedIngredients(newOrder));
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  })
  const constructorProps = {
    text: ingredientData.name,
    price: ingredientData.price,
    thumbnail: ingredientData.image,
  };

  return (
    <div ref={dropRef} style={{opacity: isDrag ? 0 : isHover ? 0.3 : 1}}>
      <div ref={dragRef}>
        <ConstructorElement {...constructorProps}  handleClose={
          () => dispatch(removeSelectedItem(ingredientData))
        }/>
      </div>
    </div>
  )
};


export default IngredientItem;