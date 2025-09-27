import { IngredientSectionName, TIngredientItem } from "types";

export type DropPayload = {
  type: IngredientSectionName;
  ingredientData: TIngredientItem;
}