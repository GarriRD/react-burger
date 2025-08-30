import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getIngredientsDetails } from "services/ingredients-service";
import { fetchPendingOrder, parseOrder } from "services/orders-service";
import selectedIngredientsSlice from "services/actions/selected-ingredients-slice";

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
      const currentIngredient = action.payload.ingredientItem;
      let ingredient = state.ingredients.filter(item => item._id === currentIngredient._id);
      if (ingredient.length === 0) {
        throw new Error('Попытка изменить несуществующий ингредиент');
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
    }).addCase(selectedIngredientsSlice.actions.setBun, (state, action) => {
      const buns = state.ingredients.filter(item => item.type === 'bun');

      buns.forEach(item => {
        if (action.payload._id === item._id) {
          item.count = 1;
        } else {
          item.count = 0;
        }
      })
    }).addCase(selectedIngredientsSlice.actions.removeSelectedItem, (state, action) => {
      const removedItem = action.payload;

      state.ingredients.forEach(item => {
        if(item._id === removedItem._id) {
          item.count = item.count - 1;
        }
      });

    }).addCase(selectedIngredientsSlice.actions.addSelectedItem, (state, action) => {
      const addeditem = action.payload;

      state.ingredients.forEach(item => {
        if(item._id === addeditem._id) {
          item.count = item.count + 1;
        }
      });
    })
  }
});

export default ingredinetsSlice;
export { getIngredients };