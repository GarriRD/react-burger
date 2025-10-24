import { OrderResponse, ServiceResponse, ServiceResponseFailure, ServiceResponseSuccess, TIngredientItem } from "types";
import store, { createStoreInstance } from ".";
import { getOrderData, initState } from "./order-slice"
import * as orderService from "services/orders-service";

describe('Test suite for orderSlice', () => {
  let testStore: typeof store;

  beforeEach(() => {
    testStore = createStoreInstance();
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Test initial state', () => {
    const expectedState = {...initState};

    expect(testStore.getState().order).toEqual(expectedState);
  });

  it('Test orderSlice extra reducer getOrderData', async () => {
    const orderId = -1000
    const expectedState = {
      pending: { ...initState, orderLoad: true },
      rejected: { ...initState, orderError: true },
      fulfilled: { ...initState, orderId }
    };

    let resolver: (value: Awaited<ServiceResponse<OrderResponse>>) => void;
    let action;
    let promise: ServiceResponse<OrderResponse> = new Promise(resolve => {
      resolver = resolve;
    });
    const spyFetchOrderData = jest.spyOn(orderService, 'fetchOrderData');
    spyFetchOrderData.mockReturnValue(promise);
    action = testStore.dispatch(getOrderData({
      allIngredientsData: [],
      abortSignal: new AbortController().signal,
      token: ''
    }));
    expect(testStore.getState().order).toEqual(expectedState.pending);
    resolver!({
      success: true,
      name: 'mock-name',
      order: {
        number: orderId
      }
    } as ServiceResponseSuccess<OrderResponse>);
    await action;
    expect(testStore.getState().order).toEqual(expectedState.fulfilled);

    promise = new Promise(resolve => {
      resolver = resolve;
    });
    spyFetchOrderData.mockReturnValue(promise);

    action = testStore.dispatch(getOrderData({
      allIngredientsData: [],
      abortSignal: new AbortController().signal,
      token: ''
    }));
    resolver!({
      success: false,
      message: 'mock fail response'
    } as ServiceResponseFailure);
    
    await action;
  
    expect(testStore.getState().order).toEqual(expectedState.rejected);

  })
})