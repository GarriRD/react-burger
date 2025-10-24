import store, { createStoreInstance } from ".";
import userSlice, { getUser, initState, updateUser } from "./user-slice";
import * as serviceUtils from 'services/utils';
import * as serviceAuth from 'services/auth';
import { ServiceResponse, ServiceResponseFailure, ServiceResponseSuccess, UserResponse } from "types";


describe('Test suite for user slice', () => {
  let testStore: typeof store;

  beforeEach(() => {
    testStore = createStoreInstance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Testing initial state', () => {
    const expectedState = initState;

    expect(testStore.getState().user).toEqual(expectedState);
  });

  it('Testing userSlice action setUser', () => {
    const pyaloadUser = {
      name: 'mock-name',
      email: 'mock@mail'
    }
    const expectedState = {
      user: pyaloadUser,
      refreshing: false,
      refreshError: null
    };

    testStore.dispatch(userSlice.actions.setUser(pyaloadUser));

    expect(testStore.getState().user).toEqual(expectedState);
  });

  it('Testing userSlice extra reducer udpateUser', async () => {
    const userPayload = {
      name: 'mock-form-name',
      email: 'mock-form@mail'
    };
    const formPayload = {
      name: userPayload.name,
      email: userPayload.email,
      password: ''
    };
    const errorResponse = {
      success: false,
      message: 'mock failure response'
    }
    const expectedState = {
      pending: {
        user: null,
        refreshing: true,
        refreshError: null
      },
      fulfilled: {
        user: userPayload,
        refreshing: false,
        refreshError: null
      },
      rejected: {
        user: userPayload,
        refreshing: false,
        refreshError: errorResponse.message
      },
    }
    let resolver: (value: Awaited<ServiceResponse<UserResponse>>) => void;
    let promise: ServiceResponse<UserResponse> = new Promise(resolve => {
      resolver = resolve;
    });


    const spyCookie = jest.spyOn(serviceUtils, 'getCookie');
    const spyPatchUser = jest.spyOn(serviceAuth, 'patchUser');

    spyCookie.mockReturnValue('mock-token');
    spyPatchUser.mockImplementation(() => promise);

    let action = testStore.dispatch(updateUser({
      userForm: formPayload,
      abortSignal: new AbortController().signal
    }));
    expect(testStore.getState().user).toEqual(expectedState.pending);
    resolver!({
      success: true,
      user: userPayload
    } as ServiceResponseSuccess<UserResponse>);
    await action;
    expect(testStore.getState().user).toEqual(expectedState.fulfilled);

    promise = new Promise(resolve => {
      resolver = resolve;
    });
    spyPatchUser.mockImplementation(() => promise);
    action = testStore.dispatch(updateUser({
      userForm: formPayload,
      abortSignal: new AbortController().signal
    }));
    resolver!(errorResponse as ServiceResponseFailure);
    await action;
    expect(testStore.getState().user).toEqual(expectedState.rejected);
  });


  it('Testing userSlice extra reducer udpateUser', async () => {
    const userPayload = {
      name: 'mock-form-name',
      email: 'mock-form@mail'
    };
    const expectedState = {
      user: userPayload,
      refreshing: false,
      refreshError: null
    };

    let resolver: (value: Awaited<ServiceResponse<UserResponse>>) => void;
    let promise: ServiceResponse<UserResponse> = new Promise(resolve => {
      resolver = resolve;
    });


    const spyCookie = jest.spyOn(serviceUtils, 'getCookie');
    const spyFetchUser = jest.spyOn(serviceAuth, 'fetchUser');

    spyCookie.mockReturnValue('mock-token');
    spyFetchUser.mockImplementation(() => promise);

    let action = testStore.dispatch(getUser());
    resolver!({
      success: true,
      user: userPayload
    });
    await action;
    expect(testStore.getState().user).toEqual(expectedState);
  })
});