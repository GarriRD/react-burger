const BASE_URL = 'https://norma.nomoreparties.space/api/auth'


const jsonHeaders = {
  'Content-Type': 'application/json',
}


const fetchRequest = async (url, method, body, headers, abortSignal) => {
  const urlLink = `${BASE_URL}${url}`
  const params = {
    signal: abortSignal,
  }
  Object.entries({method, body, headers}).forEach(([key, value]) => {
    if(value) {
      params[key] = value;
    }

  })
  
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


const register = async (name, email, password, abortSignal) => {
  const body = JSON.stringify({
    email,
    password,
    name,
  });

  const method = 'POST';

  return await fetchRequest('/register', method, body, jsonHeaders, abortSignal);
};

const login = async (email, password, abortSignal) => {
  const body = JSON.stringify({
    email,
    password,
  });

  const method = 'POST';

  return await fetchRequest('/login', method, body, jsonHeaders, abortSignal);
};

const forgotPasswordCode = async (email, abortSignal) => {
  
  const body = JSON.stringify({
    email
  });

  const method = 'POST';

  return await fetchRequest('/password-reset', method, body, jsonHeaders, abortSignal);
};


const passwordReset = async (password, token, abortSignal) => {
  const body = JSON.stringify({
    password,
    token,
  });

  const method = 'POST';

  const res =  await fetchRequest('/password-reset/reset', method, body, jsonHeaders, abortSignal);

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

  return await fetchRequest('/token', method, body, jsonHeaders, abortSignal);
};


const fetchUser = async (token, abortSignal) => {
  const headers = {
    'Authorization': token,
  };

  const method = 'GET';

  return await fetchRequest('/user', method, null, headers, abortSignal);
};


const patchUser = async (token, userForm, abortSignal) => {
  const body = JSON.stringify(userForm);

  const headers = {
    ...jsonHeaders,
    'Authorization': token,
  };

  const method = 'PATCH';

  const res = await fetchRequest('/user', method, body, headers, abortSignal);
  return res;
};

const logout = async (token, abortSignal) => {
  const body = JSON.stringify({ token });

  const method = 'POST';

  return await fetchRequest('/logout', method, body, jsonHeaders, abortSignal);
}





export { register, login, forgotPasswordCode, passwordReset, renewToken, fetchUser, patchUser, logout };