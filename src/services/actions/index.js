import { configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from 'services/actions/ingredients-slice';
import selectedIngredientsSlice from "./selected-ingredients-slice";
import orderSlice from "./order-slice";
import showIngredientSlice from "./shown-ingredient-slice";

const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice.reducer,
    selectedIngredients: selectedIngredientsSlice.reducer,
    order: orderSlice.reducer,
    shownIngredient: showIngredientSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});


export default store;