import { createSlice } from "@reduxjs/toolkit";

const shownIngredientSlice = createSlice({
  name: 'shownIngredient',
  initialState: {
    ingredientData: null,
    shownIngredientModalVisible: false,
  },
  reducers: {
    setIngredientData: (state, action) => {
      state.ingredientData = action.payload

      return state;
    },
    modalSwitch: state => {
      state.shownIngredientModalVisible = !state.shownIngredientModalVisible;

      return state;
    }
  }
});

export default shownIngredientSlice;