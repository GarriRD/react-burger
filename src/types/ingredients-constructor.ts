import { TIngredientItem, TSelectedIngredient } from "./ingredients-data"

export type ConstructorState = {
  selectedBun: TIngredientItem;
  selectedIngredients: TSelectedIngredient[];
}