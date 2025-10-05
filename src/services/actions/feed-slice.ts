import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderData } from "types";

type SliceState = {
  orders?: OrderData[];
  total?: number;
  totalToday?: number;
  error: boolean;
};

type MessagePayload = Required<Pick<SliceState, 'orders'>> & Pick<SliceState, 'total' | 'totalToday'>

const initState: SliceState = {
  orders: undefined,
  total: undefined,
  totalToday: undefined,
  error: false
}

const feedSlice = createSlice({
  name: 'feed',
  initialState: { ...initState },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;

      return state;
    },
    parseFeedMessage: (state, action: PayloadAction<MessagePayload>) => {
      const { orders, total, totalToday } = action.payload;

      state.total = total ? total : state.total;
      state.totalToday = totalToday ? totalToday : state.totalToday;
      state.orders = orders;

      return state;
    },
    resetState: state => {
      state = { ...initState };
    
      return state;
    }
  }
});


export default feedSlice;