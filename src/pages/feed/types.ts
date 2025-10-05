import { OrderData } from "types"

export type FeedData = {
  orders: OrderData[];
  total: number;
  totalToday: number;
}