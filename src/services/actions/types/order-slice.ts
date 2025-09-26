import { AllIngredients } from "types/order"

export type AllIngredientsWithSignal = {
  allIngredientsData: AllIngredients;
  abortSignal?: AbortSignal;
}