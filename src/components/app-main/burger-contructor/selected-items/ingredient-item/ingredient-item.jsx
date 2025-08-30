import { useDispatch, useSelector } from "react-redux"
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import selectedIngredientsSlice from "services/actions/selected-ingredients-slice";
import { ingredientDataIndexedProp } from "utils/props-types";

const IngredientItem = ({ ingredientData }) => {
  const dispatch = useDispatch();
  const selectedIngredients = useSelector(store => store.selectedIngredients.selectedIngredients);
  const { setSelectedIngredients, removeSelectedItem } = selectedIngredientsSlice.actions;

  const [{isDrag}, dragRef] = useDrag({
    type: 'ingredientItem',
    item: ingredientData,
    collect: monitor => ({
      isDrag: monitor.isDragging(),
    })
  })
  

  const [{isHover}, dropRef] = useDrop({
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

IngredientItem.propTypes = {
  ingredientData: ingredientDataIndexedProp,
}


export default IngredientItem;