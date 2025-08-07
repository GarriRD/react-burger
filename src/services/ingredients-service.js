import ingredientsData from "utils/data";

/* 
  Сервис для получения и обработки(при необходимости) данных о доступных ингредиентах
*/

/*
  Получить полный список ингредиентов
*/
const getIngredientsDetails = () => {
  return ingredientsData;
}

export { getIngredientsDetails };