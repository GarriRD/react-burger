import { AuthResponse, ServiceParams, ServiceResponse, SuccessResponse, TokenResponse, UserResponse } from "types"
import { UserForm } from "types/user"

const BASE_URL = 'https://norma.nomoreparties.space/api'


const jsonHeaders = {
  'Content-Type': 'application/json',
}


const fetchRequest = async <T extends Record<string, any>>(
  url: string, 
  method?: string, 
  body?: string, 
  headers?: Record<string, string>, 
  abortSignal?: AbortSignal
): ServiceResponse<T> => {

  const urlLink = `${BASE_URL}${url}`
  const params: ServiceParams = {
    signal: abortSignal,
    body: body,
    headers: headers,
    method: method
  }
  
  const data =  await fetch(urlLink, params)
  // Без проверки res.ok т.к. сервер возвращает 4** статус при принятом запросе, но неудачной его обработке вместе
  // с причиной в теле ответа
  .then(res => res.json())
  .then(data => data)
  .catch(e => ({
    success: false, message: e.message
  }));
  
  return data;
}


const register = async (name: string, email: string, password: string, abortSignal?: AbortSignal): ServiceResponse<AuthResponse> => {
  const body = JSON.stringify({
    email,
    password,
    name,
  });

  const method = 'POST';

  return await fetchRequest<AuthResponse>('/auth/register', method, body, jsonHeaders, abortSignal);
};

const login = async (email: string, password: string, abortSignal?: AbortSignal): ServiceResponse<AuthResponse> => {
  const body = JSON.stringify({
    email,
    password,
  });

  const method = 'POST';

  return await fetchRequest<AuthResponse>('/auth/login', method, body, jsonHeaders, abortSignal);
};

const forgotPasswordCode = async (email: string, abortSignal?: AbortSignal): ServiceResponse<SuccessResponse> => {
  
  const body = JSON.stringify({
    email
  });

  const method = 'POST';

  return await fetchRequest<SuccessResponse>('/password-reset', method, body, jsonHeaders, abortSignal);
};


const passwordReset = async (password: string, token: string, abortSignal?: AbortSignal): ServiceResponse<SuccessResponse> => {
  const body = JSON.stringify({
    password,
    token,
  });

  const method = 'POST';

  const res =  await fetchRequest<SuccessResponse>('/password-reset/reset', method, body, jsonHeaders, abortSignal);

  if(!res.success) {

    res.message = 'Incorrect code';
  }

  return res;
};

const renewToken = async (token: string, abortSignal?: AbortSignal): ServiceResponse<TokenResponse> => {
  const body = JSON.stringify({
    token,
  });

  const method = 'POST';

  return await fetchRequest<TokenResponse>('/auth/token', method, body, jsonHeaders, abortSignal);
};


const fetchUser = async (token: string, abortSignal?: AbortSignal): ServiceResponse<UserResponse> => {
  const headers = {
    'Authorization': token,
  };

  const method = 'GET';

  return await fetchRequest<UserResponse>('/auth/user', method, undefined, headers, abortSignal);
};


const patchUser = async (token: string, userForm: UserForm, abortSignal?: AbortSignal): ServiceResponse<UserResponse> => {
  const body = JSON.stringify(userForm);

  const headers = {
    ...jsonHeaders,
    'Authorization': token,
  };

  const method = 'PATCH';

  const res = await fetchRequest<UserResponse>('/auth/user', method, body, headers, abortSignal);
  return res;
};

const logout = async (token: string, abortSignal?: AbortSignal): ServiceResponse<SuccessResponse> => {
  const body = JSON.stringify({ token });

  const method = 'POST';

  return await fetchRequest<SuccessResponse>('/auth/logout', method, body, jsonHeaders, abortSignal);
}





export { register, login, forgotPasswordCode, passwordReset, renewToken, fetchUser, patchUser, logout };