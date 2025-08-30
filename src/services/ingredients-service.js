

/* 
  Сервис для получения и обработки(при необходимости) данных о доступных ингредиентах
*/


const ingredientsUrl = 'https://norma.nomoreparties.space/api/ingredients'

/*
  Получить полный список ингредиентов
*/
const getIngredientsDetails = async abortSignal => {
  const data = fetch(ingredientsUrl, { signal: abortSignal })
  .then(res => {
  
    if(res.ok) {
      return res.json();
    }
    
    throw new Error('Ошибка при получении данных ингредиентов, non ok response');
  })
  .then(data => data.data)
  .catch(() => []);

  return data
}

export { getIngredientsDetails };