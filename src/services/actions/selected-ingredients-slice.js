import { createSlice } from "@reduxjs/toolkit";
import { getIngredients } from "services/actions/ingredients-slice";
import { getOrderData } from "./order-slice";


const ingredientToArray = (item, count) => {
  return [...Array(count).keys()].map(idx => ({...item, itemId: `${item._id}_${idx}`}));
}

const setConstructorState = state => {
  sessionStorage.setItem('constructorState', 
    JSON.stringify({selectedBun: state.selectedBun, selectedIngredients: state.selectedIngredients})
  );
}

const setOrder = (state, action) => {
  
  const selectedItems = action.payload.filter(item => item.count > 0);
  const selectedBun = selectedItems.filter(item => item.type === 'bun')[0]
  state.selectedBun = !!selectedBun ? selectedBun : null;

  const selectedIngredients = selectedItems.filter(item => item.type !== 'bun');

  const orderItems = selectedIngredients.map(item => {
    const items = ingredientToArray(item, item.count);

    return items;
  }).flat();

  state.selectedIngredients = orderItems.map((item, idx) => ({...item, itemOrder: idx}));
  state.selectionLoaded = true;

  let constructorState = sessionStorage.getItem('constructorState');
  if(!constructorState) {
    setConstructorState(state);
  }
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
    
      setConstructorState(state);
      return state;
    },
    highlightSwitch: state => {
      state.selectionHighlighted = !state.selectionHighlighted;

      return state;
    },

    setSelectedIngredients: (state, action) => {
      state.selectedIngredients = action.payload.map((item, idx) => ({...item, itemOrder: idx}));
      setConstructorState(state);
      return state;
    },
    removeSelectedItem: (state, action) => {
      const removeditem = action.payload;
      let selectedIngredients = state.selectedIngredients.filter(item => item.itemId !== removeditem.itemId);
      selectedIngredients.forEach((item, idx) => {
        item.itemOrder = idx;
      })

      state.selectedIngredients = selectedIngredients;
      setConstructorState(state);
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
      setConstructorState(state);
      return state;

    },
    setFromState: (state, action) => {
      state.selectedBun = action.payload.selectedBun;
      state.selectedIngredients = action.payload.selectedIngredients;
      state.selectionLoaded = true;

      return state;
    }
  },
  extraReducers: builder => {
    builder
    .addCase(getIngredients.fulfilled, setOrder)
    .addCase(getOrderData.fulfilled, state => {
      state.selectedBun = null;
      state.selectedIngredients = [];
      sessionStorage.removeItem('constructorState');
    })
  }
  
});


export default selectedIngredientsSlice;