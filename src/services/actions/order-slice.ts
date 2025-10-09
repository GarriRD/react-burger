import { CaseReducer, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchOrderData } from "services/orders-service";
import { OrderResponse, ServiceResponseSuccess } from "types";
import { ThunkApiStringReject } from "./types";
import { AllIngredientsWithSignal } from "./types/order-slice";

type SliceState = {
  orderLoad: boolean,
  orderError: boolean,
  orderId: number | null,
  orderModalVisible: boolean,
}

const getOrderData = createAsyncThunk
<ServiceResponseSuccess<OrderResponse>, AllIngredientsWithSignal, ThunkApiStringReject>('order/getId',

  async ({allIngredientsData, token, abortSignal}, thunkApi) => {
    const orderData = await fetchOrderData(allIngredientsData, token, abortSignal);
    
    if(!orderData.success) {
      return thunkApi.rejectWithValue('Пустое значение при запросе на обработку заказа');
    }
    
    return orderData;
  }
);

const modalSwitch: CaseReducer<SliceState, PayloadAction<void>> = state => {
  state.orderModalVisible = !state.orderModalVisible;
};

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderLoad: false,
    orderError: false,
    orderId: null,
    orderModalVisible: false,
  } as SliceState,
  reducers: {
    modalSwitch
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