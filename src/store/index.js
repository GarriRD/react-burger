import { configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from 'store/ingredients/ingredients-slice';

const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});


export default store;