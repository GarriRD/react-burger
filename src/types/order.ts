import { TIngredientItem, TSelectedIngredient } from "./ingredients-data";

export type AllIngredients = Array<TIngredientItem | TSelectedIngredient>
export type OrderData = {
  _id: string;
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status?: string;
  updatedAt: string;
}