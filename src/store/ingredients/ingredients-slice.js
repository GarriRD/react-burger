import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getIngredientsDetails } from "services/ingredients-service";
import { fetchPendingOrder, parseOrder } from "services/orders-service";

const getIngredients = createAsyncThunk('ingredients/get',
  async (abortSignal, thunkApi) => {
      const loadedIngredients = await getIngredientsDetails(abortSignal);

      if (loadedIngredients.length === 0) {

        return thunkApi.rejectWithValue('Failed fetch ingredients')
      }
      
      const currentOrder = fetchPendingOrder();
      const parsedIngredients = parseOrder(loadedIngredients, currentOrder);

      if (parsedIngredients.ingredientsStatus !== 'success') {
        return thunkApi.rejectWithValue('Failed to parse pending order')
      }
  
      return parsedIngredients.ingredientsData
  }
)

const ingredinetsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    ingredients: [],
    currentSection: 'bun',
    ingredientsLoad: false,
    ingredientsError: false
  },
  reducers: {
    setIngredientCount: (state, action) => {
      let ingredient = state.ingredients.filter(item => item._id === action.payload.id);

      if (ingredient.length() === 0) {
        throw new Error('Attempted to change ingredient with non-existend id');
      }

      ingredient = ingredient[0];
      ingredient.count = action.payload.newCount;

      return state;
    },
    
    setCurrentSection: (state, action) => {
      state.currentSection = action.payload;

      return state;
    }
  },
  extraReducers: builder => {
    builder.addCase(getIngredients.pending, state => {
      
      state.ingredientsLoad = true;
      state.ingredientsError = false;

    }).addCase(getIngredients.fulfilled, (state, action) => {
      
      state.ingredientsLoad = false;
      state.ingredientsError = false;
      state.ingredients = action.payload;

    }).addCase(getIngredients.rejected, state => {
      
      state.ingredientsLoad = false;
      state.ingredientsError = true;
      state.ingredients = [];
    })
  }
});

export default ingredinetsSlice;
export { getIngredients };