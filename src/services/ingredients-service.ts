

/* 
  Сервис для получения и обработки(при необходимости) данных о доступных ингредиентах
*/

import { TIngredientBody } from "types";


const ingredientsUrl = 'https://norma.education-services.ru/api/ingredients'

/*
  Получить полный список ингредиентов
*/
const getIngredientsDetails = async (abortSignal: AbortSignal): Promise<TIngredientBody[]> => {
  const data = await fetch(ingredientsUrl, { signal: abortSignal })
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