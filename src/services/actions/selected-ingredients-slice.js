import { createSlice } from "@reduxjs/toolkit";
import { getIngredients } from "services/actions/ingredients-slice";


const ingredientToArray = (item, count) => {
  return [...Array(count).keys()].map(idx => ({...item, itemId: `${item._id}_${idx}`}));
}

const setOrder = (state, action) => {
  
  const selectedItems = action.payload.filter(item => item.count > 0);

  state.selectedBun = selectedItems.filter(item => item.type === 'bun')[0];
  const selectedIngredients = selectedItems.filter(item => item.type !== 'bun');

  const orderItems = selectedIngredients.map(item => {
    const items = ingredientToArray(item, item.count);

    return items;
  }).flat();

  state.selectedIngredients = orderItems.map((item, idx) => ({...item, itemOrder: idx}));
  state.selectionLoaded = true;
};

const selectedIngredientsSlice = createSlice({
  name: 'selectedIngredients',
  initialState: {
    selectedBun: null,
    selectedIngredients: [],
    selectionLoaded: false,
    selectionHighlighted: false,
  },
  reducers: {
    setBun: (state, action) => {
      state.selectedBun = {...action.payload, count: 1};
      
      return state;
    },
    highlightSwitch: state => {
      state.selectionHighlighted = !state.selectionHighlighted;

      return state;
    },

    setSelectedIngredients: (state, action) => {
      state.selectedIngredients = action.payload.map((item, idx) => ({...item, itemOrder: idx}));

      return state;
    },
    removeSelectedItem: (state, action) => {
      const removeditem = action.payload;
      let selectedIngredients = state.selectedIngredients.filter(item => item.itemId !== removeditem.itemId);
      selectedIngredients.forEach((item, idx) => {
        item.itemOrder = idx;
      })

      state.selectedIngredients = selectedIngredients;

      return state;
    },
    addSelectedItem: (state, action) => {
      const addedItem = action.payload;
      let selectedIngredients = state.selectedIngredients;
      let similarItems = selectedIngredients.filter(item => item._id === addedItem._id);

      let currId = 0;
      if(similarItems.length > 0) {
        currId = 1 + similarItems.reduce((acc, curr) => {
          let itemIdNum = curr.itemId.split('_');
          itemIdNum = parseInt(itemIdNum[itemIdNum.length - 1]);
          
          return Math.max(acc, itemIdNum);
        }, currId);

      }

      selectedIngredients.push({...addedItem, itemId: `${addedItem._id}_${currId}`});
      selectedIngredients.forEach((item, idx) => {
        if(item._id === addedItem._id) {
          item.count = similarItems.length + 1;
        }

        item['itemOrder'] = idx;
      });
      
      state.selectedIngredients = selectedIngredients;

      return state;

    }
  },
  extraReducers: builder => {
    builder.addCase(getIngredients.fulfilled, setOrder)
  }
  
});


export default selectedIngredientsSlice;