export type TIngredientBody = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TIngredientItem = TIngredientBody & {
  count: number;
};

export type TSelectedIngredient = TIngredientItem & {
  itemId: string;
  itemOrder: number;
};

export type IngredientSectionName = 'bun' | 'sauce' | 'main';