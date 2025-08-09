

/* 
  Сервис для получения и обработки(при необходимости) данных о доступных ингредиентах
*/


const ingredientsUrl = 'https://norma.nomoreparties.space/api/ingredients'

/*
  Получить полный список ингредиентов
*/
const getIngredientsDetails = async abortSignal => {
  const data = fetch(ingredientsUrl, { signal: abortSignal })
  .then(res => res.json())
  .then(data => data.data)
  .catch(() => []);

  return data
}

export { getIngredientsDetails };