import { TIngredientItem, TSelectedIngredient } from "types";
import { v4 } from "uuid";
import * as crypto from 'crypto';


Object.defineProperty(globalThis, 'crypto', {
  value: {
    getRandomValues: (arr: Array<any>) => crypto.randomBytes(arr.length)
  }
});

export const getMockIngredient = (): TIngredientItem => {
  const mockTypes = ['bun', 'main', 'sauce'];
  const randomChoice = Math.floor(Math.random() * 100) % 3;

  return {
    _id: v4(),
    name: 'mock-name',
    type: mockTypes[randomChoice],
    proteins: -1,
    fat: -1,
    carbohydrates: -1,
    calories: -1,
    price: -1,
    image: 'mock-url',
    image_mobile: 'mock-url2',
    image_large: 'mock-url3',
    __v: -1,
    count: 0
  }
};

export const getMockBun = (): TIngredientItem => {
  return { ...getMockIngredient(), type: 'bun' };
};

export const getMockSelectedIngredient = (itemOrder?: number): TSelectedIngredient => {
  return { ...getMockIngredient(), itemId: v4(), itemOrder: itemOrder || 0 };
}