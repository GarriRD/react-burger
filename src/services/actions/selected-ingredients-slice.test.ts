import { TIngredientBody, TSelectedIngredient } from "types";
import store, { createStoreInstance } from ".";
import selectedIngredientsSlice, { initState } from "./selected-ingredients-slice";
import { getIngredients } from "./ingredients-slice";
import { getMockBun, getMockIngredient } from "test-utils/ingredient";
import * as ingredientService from "services/ingredients-service";
import { v4 } from "uuid";

describe('Test suite for selectedIngredientsSlice', () => {
  let testStore: typeof store;
  let ingredients: TIngredientBody[];
  let dedicatedBuns: TIngredientBody[];

  beforeEach(async () => {
    testStore = createStoreInstance();
    const mockIngredients = Array(10).fill(0).map(() => getMockIngredient());
    const mockBuns = Array(2).fill(0).map(() => getMockBun());
    ingredients = mockIngredients.map(item => {
      const {count, ...newIngredient} = item;

      return newIngredient;
    });
    dedicatedBuns = mockBuns.map(item => {
      const {count, ...newIngredient} = item;

      return newIngredient;
    });

    jest.spyOn(ingredientService, 'getIngredientsDetails').mockReturnValue(new Promise(resolve => {
      resolve([...ingredients, ...dedicatedBuns]);
    }));

    await testStore.dispatch(getIngredients(new AbortController().signal));
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Test initial state', () => {
    const expectedState = {...initState};
    expectedState.selectionLoaded = true;

    expect(testStore.getState().selectedIngredients).toEqual(expectedState);
  });

  it('Test selectedIngredientsSlice setSelectedIngredients', () => {
    const expectedState = { ...initState };
    expectedState.selectionLoaded = true;
    const selectedIngredients: TSelectedIngredient[] = ingredients.map((item, idx) => ({ ...item, itemId: v4(), itemOrder: idx, count: 0 }))
    expectedState.selectedIngredients = selectedIngredients;

    testStore.dispatch(selectedIngredientsSlice.actions.setSelectedIngredients(selectedIngredients));
    expect(testStore.getState().selectedIngredients).toEqual(expectedState);
  });

  it('Test selectedIngredientsSlice addSelectedIngredient', () => {
    const selectedItems = ingredients.slice(0, 2);

    selectedItems.forEach(item => testStore.dispatch(selectedIngredientsSlice.actions.addSelectedItem({ ...item, count: 0})));

    expect(testStore.getState().selectedIngredients.selectedIngredients.length).toBe(selectedItems.length);
    const storeSelectedIds = testStore.getState().selectedIngredients.selectedIngredients.map(item => item._id);
    
    selectedItems.forEach(item => expect(storeSelectedIds.includes(item._id)).toBeTruthy());
  });

  it('Test selectedIngredientsSlice removeSelectedIngredient', () => {
    const selectedItems = ingredients.slice(0, 2);

    selectedItems.forEach(item => testStore.dispatch(selectedIngredientsSlice.actions.addSelectedItem({ ...item, count: 0})));

    const selectedItem = testStore.getState().selectedIngredients.selectedIngredients[0];
    testStore.dispatch(selectedIngredientsSlice.actions.removeSelectedItem(selectedItem));
    
    expect(!testStore.getState().selectedIngredients.selectedIngredients.map(item => item.itemId).includes(selectedItem.itemId)).toBeTruthy();
  });

  
});