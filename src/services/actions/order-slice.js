import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchOrderData } from "services/orders-service";

const getOrderData = createAsyncThunk('order/getId', 
  async ({allIngredientsData, abortSignal}, thunkApi) => {
    
    const orderData = await fetchOrderData(allIngredientsData, abortSignal);
    
    if(!orderData) {
      return thunkApi.rejectWithValue('Пустое значение при запросе на обработку заказа');
    }

    return orderData;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderLoad: false,
    orderError: false,
    orderId: null,
    orderModalVisible: false,
  },
  reducers: {
    modalSwitch: state => {
      state.orderModalVisible = !state.orderModalVisible;
    }
  },
  extraReducers: builder => {
    builder.addCase(getOrderData.pending, state => {
      
      state.orderLoad = true;
      state.orderError = false;

    }).addCase(getOrderData.fulfilled, (state, action) => {
      state.orderLoad = false;
      state.orderError = false;
      state.orderId = action.payload.order.number;
      
    }).addCase(getOrderData.rejected, state => {
      state.orderLoad = false;
      state.orderError = true;
    });
  }
})


export default orderSlice;
export { getOrderData };