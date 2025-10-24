import { AllIngredients } from "types/order"

export type AllIngredientsWithSignal = {
  allIngredientsData: AllIngredients;
  token: string;
  abortSignal?: AbortSignal;
}