import { CaseReducer, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getIngredientsDetails } from "services/ingredients-service";
import selectedIngredientsSlice from "services/actions/selected-ingredients-slice";
import { getOrderData } from "./order-slice";
import { IngredientSectionName, TIngredientItem } from "types";
import { ThunkApiStringReject } from "./types";

type SliceState = {
  ingredients: TIngredientItem[];
  currentSection: IngredientSectionName;
  ingredientsLoad: boolean;
  ingredientsError: boolean;
};


const setIngredientCount: CaseReducer<SliceState, PayloadAction<{ ingredientItem: TIngredientItem, newCount: number }>> 
= (state, action) => {
    const currentIngredient = action.payload.ingredientItem;
    
    const ingredientFilter = state.ingredients.filter((item) => item._id === currentIngredient._id);

    if (ingredientFilter.length === 0) {
      throw new Error('Попытка изменить несуществующий ингредиент');
    }
  
    const ingredient = ingredientFilter[0];
    ingredient.count = action.payload.newCount;
    
    return state;
}

const setCurrentSection: CaseReducer<SliceState, PayloadAction<IngredientSectionName>> = (state, action) => {
  state.currentSection = action.payload;

  return state;
};


const getIngredients = createAsyncThunk<TIngredientItem[], AbortSignal, ThunkApiStringReject>('ingredients/get',
  async (abortSignal, thunkApi) => {
      const loadedIngredients = await getIngredientsDetails(abortSignal);
      
      if (loadedIngredients.length === 0) {

        return thunkApi.rejectWithValue('Failed fetch ingredients')
      }
      
      const parsedIngredients = loadedIngredients.map(item => ({...item, count: 0}) );
      
      return parsedIngredients
  }
);

export const initState: SliceState = {
  ingredients: [],
  currentSection: 'bun',
  ingredientsLoad: false,
  ingredientsError: false
};

const ingredinetsSlice = createSlice({
  name: 'ingredients',
  initialState: initState,
  reducers: {
    setIngredientCount,
    setCurrentSection
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
    }).addCase(selectedIngredientsSlice.actions.setFromState, (state, action) => {
      const selection = action.payload.selectedIngredients.reduce((acc, item) => {
        const itemCnt = acc[item._id];
        if(!itemCnt) {
          acc[item._id] = 1;
          return acc;
        }

        acc[item._id] = itemCnt + 1;
        return acc;
      }, {} as { [key: string]: number });

      if(!!action.payload.selectedBun) {
        selection[action.payload.selectedBun._id] = 1;
      }


      state.ingredients = state.ingredients.map(item => {
        const itemCnt = selection[item._id];

        if(itemCnt) {
          return {...item, count: itemCnt};
        }

        return {...item, count: 0};
      });
    }).addCase(getOrderData.fulfilled, state => {
      state.ingredients.forEach(item => {
        item.count = 0;
      })
    })
  }
});

export default ingredinetsSlice;
export { getIngredients };