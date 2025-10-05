import { OrderData } from "./order";

export type FeedSocketResponse = {
  sucess: boolean;
  orders: OrderData[];
  total: number;
  totalToday: number;
};