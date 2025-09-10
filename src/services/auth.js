const registerLink = 'https://norma.nomoreparties.space/api/auth/register'
const loginLink = 'https://norma.nomoreparties.space/api/auth/login'
const passwordCodeLink = 'https://norma.nomoreparties.space/api/password-reset'
const passwordResetLink = 'https://norma.nomoreparties.space/api/password-reset/reset'
const tokenLink = 'https://norma.nomoreparties.space/api/auth/token'
const userLink = 'https://norma.nomoreparties.space/api/auth/user'
const logoutLink = 'https://norma.nomoreparties.space/api/auth/logout'


const jsonHeaders = {
  'Content-Type': 'application/json',
}


const fetchRequest = async (url, method, body, headers, abortSignal) => {
  const params = {
    signal: abortSignal,
  }
  Object.entries({method, body, headers}).forEach(([key, value]) => {
    if(value) {
      params[key] = value;
    }

  })
  
  const data =  await fetch(url, params)
  // Без проверки res.ok т.к. сервер возвращает 4** статус при принятом запросе, но неудачной его обработке вместе
  // с причиной в теле ответа
  .then(res => res.json())
  .then(data => data)
  .catch(e => ({
    success: false, message: e.message
  }));

  return data;
}


const register = async (name, email, password, abortSignal) => {
  const body = JSON.stringify({
    email,
    password,
    name,
  });

  const method = 'POST';

  return await fetchRequest(registerLink, method, body, jsonHeaders, abortSignal);
};

const login = async (email, password, abortSignal) => {
  const body = JSON.stringify({
    email,
    password,
  });

  const method = 'POST';

  return await fetchRequest(loginLink, method, body, jsonHeaders, abortSignal);
};

const forgotPasswordCode = async (email, abortSignal) => {
  
  const body = JSON.stringify({
    email
  });

  const method = 'POST';

  return await fetchRequest(passwordCodeLink, method, body, jsonHeaders, abortSignal);
};


const passwordReset = async (password, token, abortSignal) => {
  const body = JSON.stringify({
    password,
    token,
  });

  const method = 'POST';

  const res =  await fetchRequest(passwordResetLink, method, body, jsonHeaders, abortSignal);

  if(!res.success) {

    res.message = 'Incorrect code';
  }

  return res;
};

const renewToken = async (token, abortSignal) => {
  const body = JSON.stringify({
    token,
  });

  const method = 'POST';

  return await fetchRequest(tokenLink, method, body, jsonHeaders, abortSignal);
};


const fetchUser = async (token, abortSignal) => {
  const headers = {
    'Authorization': token,
  };

  const method = 'GET';

  return await fetchRequest(userLink, method, null, headers, abortSignal);
};


const patchUser = async (token, userForm, abortSignal) => {
  const body = JSON.stringify(userForm);

  const headers = {
    ...jsonHeaders,
    'Authorization': token,
  };

  const method = 'PATCH';

  const res = await fetchRequest(userLink, method, body, headers, abortSignal);
  return res;
};

const logout = async (token, abortSignal) => {
  const body = JSON.stringify({ token });

  const method = 'POST';

  return await fetchRequest(logoutLink, method, body, jsonHeaders, abortSignal);
}





export { register, login, forgotPasswordCode, passwordReset, renewToken, fetchUser, patchUser, logout };