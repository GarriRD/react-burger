import store, { createStoreInstance } from ".";
import ingredinetsSlice, { getIngredients, initState } from "./ingredients-slice";
import { TIngredientBody, TIngredientItem } from "types";
import * as ingredientService from "services/ingredients-service";
import { getMockBun, getMockIngredient, getMockSelectedIngredient } from "test-utils/ingredient";
import selectedIngredientsSlice from "./selected-ingredients-slice";

describe('Test suite for ingredients slice', () => {
  let testStore: typeof store;
  beforeEach(() => {
    testStore = createStoreInstance();
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Testing initial state', () => {
    const expectedState = initState;

    expect(testStore.getState().ingredients).toEqual(expectedState);
  });

  it('Testing ingredientsSlice extra reducer getIngredients', async () => {
    const ingredients = Array(5).fill(0).map(() => getMockIngredient());

    const expectedState = {
      pending: {
        ingredients: [],
        currentSection: 'bun',
        ingredientsLoad: true,
        ingredientsError: false
      },
      fulfilled: {
        ingredients: ingredients,
        currentSection: 'bun',
        ingredientsLoad: false,
        ingredientsError: false
      },
      rejected: {
        ingredients: [],
        currentSection: 'bun',
        ingredientsLoad: false,
        ingredientsError: true
      }
    };

    let resolver: (value: Awaited<Promise<TIngredientBody[]>>) => void;
    let promise: Promise<TIngredientBody[]> = new Promise(resolve => {
      resolver = resolve;
    });
    const spyGetIngredientDetails = jest.spyOn(ingredientService, 'getIngredientsDetails');
    spyGetIngredientDetails.mockReturnValue(promise);
    let action = testStore.dispatch(getIngredients(new AbortController().signal));
    
    expect(testStore.getState().ingredients).toEqual(expectedState.pending);

    resolver!(ingredients.map(item => { 
        const {count, ...newItem} = item;
        return newItem;
      })
    );
    await action;
    expect(testStore.getState().ingredients).toEqual(expectedState.fulfilled);

    promise = new Promise(resolve => {
      resolver = resolve;
    });
    spyGetIngredientDetails.mockReturnValue(promise);
    
    action = testStore.dispatch(getIngredients(new AbortController().signal));
    resolver!([]);
    await action;
    expect(testStore.getState().ingredients).toEqual(expectedState.rejected);
  });

  it('Testing ingredientsSlice setIngredientCount', async () => {
    const ingredients = Array(5).fill(0).map(() => getMockIngredient());
    const expectedState = {
      ingredients: [...ingredients.map(item => ({ ...item } ))],
      currentSection: 'bun',
      ingredientsLoad: false,
      ingredientsError: false
    };
    expectedState.ingredients[0].count = 2;

    const spyGetIngredientDetails = jest.spyOn(ingredientService, 'getIngredientsDetails');
    spyGetIngredientDetails.mockReturnValue(new Promise(resolve => {
      const ingredientDetails = ingredients.map(item => { 
        const {count, ...newItem} = item;
        return newItem;
      });

      resolve(ingredientDetails);
    }));

    await testStore.dispatch(getIngredients(new AbortController().signal));

    testStore.dispatch(ingredinetsSlice.actions.setIngredientCount({
      ingredientItem: ingredients[0],
      newCount: 2
    }));

    expect(testStore.getState().ingredients).toEqual(expectedState);
  });

  it('Testing ingredientsSlice reducer setCurrentSection', () => {
    const expectedState = {
      ingredients: [],
      currentSection: 'sauce',
      ingredientsLoad: false,
      ingredientsError: false
    };

    testStore.dispatch(ingredinetsSlice.actions.setCurrentSection('sauce'));
    expect(testStore.getState().ingredients).toEqual(expectedState);
  });

  it('Testing ingredientsSlice extra reducer selectedIngredientsSlice.setBun', async () => {
    const ingredients = Array(2).fill(0).map(() => getMockBun());
    const expectedState = {
      ingredients: [ ...ingredients.map(item => ({ ...item })) ],
      currentSection: 'bun',
      ingredientsLoad: false,
      ingredientsError: false
    };
    expectedState.ingredients[0].count = 1;

    const spyGetIngredientDetails = jest.spyOn(ingredientService, 'getIngredientsDetails');
    spyGetIngredientDetails.mockReturnValue(new Promise(resolve => {
      const ingredientDetails = ingredients.map(item => { 
        const {count, ...newItem} = item;
        return newItem;
      });

      resolve(ingredientDetails);
    }));
    await testStore.dispatch(getIngredients(new AbortController().signal));
    
    testStore.dispatch(selectedIngredientsSlice.actions.setBun(ingredients[0]));
    expect(testStore.getState().ingredients).toEqual(expectedState);
  });

  it('Testing ingredientsSlice extra reducer selectedIngredientsSlice.addSelectedIngredient', async () => {
    const ingredients = Array(5).fill(0).map(() => getMockIngredient());
    const expectedState = {
      ingredients: [ ...ingredients.map(item => ({ ...item })) ],
      currentSection: 'bun',
      ingredientsLoad: false,
      ingredientsError: false
    };
    expectedState.ingredients[0].count = 1;

    const spyGetIngredientDetails = jest.spyOn(ingredientService, 'getIngredientsDetails');
    spyGetIngredientDetails.mockReturnValue(new Promise(resolve => {
      const ingredientDetails = ingredients.map(item => { 
        const {count, ...newItem} = item;
        return newItem;
      });

      resolve(ingredientDetails);
    }));
    await testStore.dispatch(getIngredients(new AbortController().signal));
    
    testStore.dispatch(selectedIngredientsSlice.actions.addSelectedItem(ingredients[0]));
    expect(testStore.getState().ingredients).toEqual(expectedState);
  });

  it('Testing ingredientsSlice extra reducer selectedIngredientsSlice.removeSelectedIngredient', async () => {
    const ingredients = Array(5).fill(0).map(() => getMockIngredient());
    const expectedState = {
      ingredients: ingredients,
      currentSection: 'bun',
      ingredientsLoad: false,
      ingredientsError: false
    };

    const spyGetIngredientDetails = jest.spyOn(ingredientService, 'getIngredientsDetails');
    spyGetIngredientDetails.mockReturnValue(new Promise(resolve => {
      const ingredientDetails = ingredients.map(item => { 
        const {count, ...newItem} = item;
        return newItem;
      });

      resolve(ingredientDetails);
    }));
    await testStore.dispatch(getIngredients(new AbortController().signal));
    
    const removedIngredient = getMockSelectedIngredient();
    removedIngredient._id = ingredients[0]._id;

    testStore.dispatch(selectedIngredientsSlice.actions.addSelectedItem(ingredients[0]));
    testStore.dispatch(selectedIngredientsSlice.actions.removeSelectedItem(removedIngredient));
    expect(testStore.getState().ingredients).toEqual(expectedState);
  });

  it('Testing ingredientsSlice extra reducer selectedIngredientsSlice.setFromState', async () => {
    const selectedIngredients =  Array.from([1, 2, 3, 4, 5].map(idx => getMockSelectedIngredient(idx)));
    const buns = Array.from([1, 2].map(idx => getMockSelectedIngredient(idx)))
    const ingredients: TIngredientItem[] = [
      ...selectedIngredients.map(item => {
        const {itemId, itemOrder, ...ing} = item;

        return ing;
      }),
      ...buns
    ];

    const expectedState = {
      ingredients: ingredients,
      currentSection: 'bun',
      ingredientsLoad: false,
      ingredientsError: false
    };

    const spyGetIngredientDetails = jest.spyOn(ingredientService, 'getIngredientsDetails');
    spyGetIngredientDetails.mockReturnValue(new Promise(resolve => {
      const ingredientDetails = ingredients.map(item => { 
        const {count, ...newItem} = item;
        return newItem;
      });

      resolve(ingredientDetails);
    }));
    await testStore.dispatch(getIngredients(new AbortController().signal));
    
    testStore.dispatch(selectedIngredientsSlice.actions.setFromState({
      selectedBun: buns[0],
      selectedIngredients: selectedIngredients
    }));

    const ingredientsState = testStore.getState().ingredients;
    const totalItemCount = ingredientsState.ingredients.reduce<number>((acc, item) => acc + item.count, 0);

    expect(totalItemCount).toBe(selectedIngredients.length + 1);
  });

  it('Testing ingredientsSlice extra reducer selectedIngredientsSlice.removeSelectedIngredient', async () => {
    const ingredients = Array(5).fill(0).map(() => getMockIngredient());
    const expectedState = {
      ingredients: ingredients,
      currentSection: 'bun',
      ingredientsLoad: false,
      ingredientsError: false
    };

    const spyGetIngredientDetails = jest.spyOn(ingredientService, 'getIngredientsDetails');
    spyGetIngredientDetails.mockReturnValue(new Promise(resolve => {
      const ingredientDetails = ingredients.map(item => { 
        const {count, ...newItem} = item;
        return newItem;
      });

      resolve(ingredientDetails);
    }));
    await testStore.dispatch(getIngredients(new AbortController().signal));
    
    const removedIngredient = getMockSelectedIngredient();
    removedIngredient._id = ingredients[0]._id;

    testStore.dispatch(selectedIngredientsSlice.actions.addSelectedItem(ingredients[0]));
    testStore.dispatch(selectedIngredientsSlice.actions.removeSelectedItem(removedIngredient));
    expect(testStore.getState().ingredients).toEqual(expectedState);
  });
});