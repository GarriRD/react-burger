import { configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from 'services/actions/ingredients-slice';
import selectedIngredientsSlice from "./selected-ingredients-slice";
import orderSlice from "./order-slice";
import userSlice from "./user-slice";
import authSlice from "./auth-slice";

const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice.reducer,
    selectedIngredients: selectedIngredientsSlice.reducer,
    order: orderSlice.reducer,
    user: userSlice.reducer,
    auth: authSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;


export default store;