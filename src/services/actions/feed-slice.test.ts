import { OrderData } from "types";
import store, { createStoreInstance } from ".";
import feedSlice, { initState } from "./feed-slice";
import { v4 } from "uuid";

describe('Test suite for feedSlice', () => {
  let testStore: typeof store;

  beforeEach(() => {
    testStore = createStoreInstance();
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Test initial state', () => {
    const expectedState = { ...initState };

    expect(testStore.getState().feed).toEqual(expectedState);
  });

  it('Test feedSlice parseFeedMessge', () => {
    const orders: OrderData[] = [
      {
        _id: '-1',
        createdAt: 'mock-time',
        ingredients: ['mock1', 'mock2', 'mock3'],
        name: 'mock-name',
        number: -1000,
        status: 'mock-status',
        updatedAt: 'mock-time'
      }
    ];

    const expectedState = { ...initState, orders};
    testStore.dispatch(feedSlice.actions.parseFeedMessage({orders: orders}));
    expect(testStore.getState().feed).toEqual(expectedState);
  });
});