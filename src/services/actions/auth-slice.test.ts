import store, { createStoreInstance } from ".";
import authSlice, { initState } from "./auth-slice"
import * as serviceUtils from 'services/utils';
import * as serviceAuth from 'services/auth';
import userSlice, { getUser } from "./user-slice";
import { ServiceResponse, ServiceResponseFailure, ServiceResponseSuccess, UserResponse } from "types";

describe('Test suite for auth slice',  () => {
  let testStore: typeof store;

  beforeEach(() => {
    testStore = createStoreInstance();
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Testing initial state', () => {
    const authState = initState;
    const storeAuthState = testStore.getState().auth;
    
    expect(authState).toEqual(storeAuthState);
  });
  
  it('Testing authSlice action login', () => {
    const expectedState = {
      logged: true,
      loginError: null,
      sending: false
    };
    const createdAction = authSlice.actions.login();


    expect(createdAction.payload).toBe(undefined);
    testStore.dispatch(createdAction);

    expect(testStore.getState().auth).toEqual(expectedState);
  });

  it('Testing authSlice action logout', () => {
    const expectedState = {
      logged: false,
      loginError: null,
      sending: false
    };
    const createdAction = authSlice.actions.logout();


    expect(createdAction.payload).toBe(undefined);
    testStore.dispatch(authSlice.actions.login());
    testStore.dispatch(createdAction);

    expect(testStore.getState().auth).toEqual(expectedState);
  });

  it('Testing authSlice action setSending', () => {
    [true, false].forEach(sendingValue => {
      const expectedState = {
        logged: false,
        loginError: null,
        sending: sendingValue
      };
      const createdAction = authSlice.actions.setSending(sendingValue);
  
  
      expect(createdAction.payload).toBe(sendingValue);
      testStore.dispatch(createdAction);
  
      expect(testStore.getState().auth).toEqual(expectedState);
    });
  });

  it('Testing authSlice action resetSending', () => {
    const expectedState = {
      logged: false,
      loginError: null,
      sending: false
    };
    const createdAction = authSlice.actions.resetSending();


    expect(createdAction.payload).toBe(undefined);
    testStore.dispatch(authSlice.actions.setSending(true));
    testStore.dispatch(createdAction);

    expect(testStore.getState().auth).toEqual(expectedState);
  });

  it('Testing authSlice action setLoginError', () => {
    ['test1', 'test2', 'test3'].forEach(loginErrorValue => {
      const expectedState = {
        logged: false,
        loginError: loginErrorValue,
        sending: false
      };
      const createdAction = authSlice.actions.setLoginError(loginErrorValue);
  
  
      expect(createdAction.payload).toBe(loginErrorValue);
      testStore.dispatch(createdAction);
  
      expect(testStore.getState().auth).toEqual(expectedState);
    });
  });

  it('Testing authSlice action setLoginError', () => {
    ['test1', 'test2', 'test3'].forEach(loginErrorValue => {
      const expectedState = {
        logged: false,
        loginError: loginErrorValue,
        sending: false
      };
      const createdAction = authSlice.actions.setLoginError(loginErrorValue);
  
  
      expect(createdAction.payload).toBe(loginErrorValue);
      testStore.dispatch(createdAction);
  
      expect(testStore.getState().auth).toEqual(expectedState);
    });
  });

  it('Testing authSlice result of getUser calls extra reducer', async () => {
    const spyGetCookie = jest.spyOn(serviceUtils, 'getCookie');
    const spyGetUser = jest.spyOn(serviceAuth, 'fetchUser');
    
    let resolver: (value: Awaited<ServiceResponse<UserResponse>>) => void;
    const userPayload = {
      success: true,
      user: {
        email: 'mock@mail.resolved',
        name: 'mock.name.resolved'
      }
    } as ServiceResponseSuccess<UserResponse>;
    const userReject = {
      success: false,
      message: 'auth required'
    } as ServiceResponseFailure;

    const expectedState = {
      sending: {
        logged: false,
        loginError: null,
        sending: true
      },
      fulfilled: {
        logged: true,
        loginError: null,
        sending: false
      },
      rejected: {
        logged: false,
        loginError: userReject.message,
        sending: false
      }
    };

    let promise: ServiceResponse<UserResponse> = new Promise(resolve => {
      resolver = resolve;
    });

    spyGetCookie.mockReturnValue('returned mock value');
    spyGetUser.mockImplementation(() => {
      return promise
    });

    let action = testStore.dispatch(getUser());
  
    expect(testStore.getState().auth).toEqual(expectedState.sending);
    resolver!(userPayload);
    await action;
    expect(testStore.getState().auth).toEqual(expectedState.fulfilled);
    
    promise = new Promise(resolve => {
      resolver = resolve;
    });
    spyGetUser.mockImplementation(() => {
      return promise
    });
    action = testStore.dispatch(getUser());
    
    resolver!(userReject);
    await action
    expect(testStore.getState().auth).toEqual(expectedState.rejected);
  });
  
  it('Testing authSlice result of setUser calls extra reducer', () => {
    const expectedState = {
      logged: true,
      loginError: null,
      sending: false
    };

    testStore.dispatch(userSlice.actions.setUser({
      email: 'test@mail',
      name: 'test-name',
    }));

    expect(testStore.getState().auth).toEqual(expectedState);
  });
})