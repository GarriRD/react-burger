/* 
  Сервис для получения и обработки(при необходимости) данных о заказах
*/


/* 
  Получить текущий заказ.

  фукнция имитирует получение данных заказа.
  Возвращает идентификаторы ингредиентов и их кол-во
*/

// Данные, на текущий момент, статичны. Функция служит как заготовка для будущих проектов
// , которые потребуют динамичности
const fetchPendingOrder  = () => {
  return [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      count: 1,
    },
    {
      _id: '643d69a5c3f7b9001cfa0946',
      count: 2,
    },
    {
      _id: '643d69a5c3f7b9001cfa093f',
      count: 1,
    },
    {
      _id: '643d69a5c3f7b9001cfa0948',
      count: 1,
    },
    {
      _id: '643d69a5c3f7b9001cfa0942',
      count: 1,
    },
    {
      _id: '643d69a5c3f7b9001cfa0949',
      count: 2,
    },
    {
      _id: '643d69a5c3f7b9001cfa094a',
      count: 2,
    }

  ];
};


/* Функция для получения данных для конструктора из инредиентов и заказа */
const parseOrder = (ingredientsData, orderData) => {
  if(ingredientsData.length === 0 || orderData.length === 0) {
    return { status: 'error', ingredientsData: [] };
  }
  let status = 'success';
  
  const ingredients = ingredientsData.map(item => {
    return {...item, count: 0}
  });



  orderData.forEach(item => {
    const ingredient = ingredients.filter(ingredientItem => ingredientItem._id === item._id)[0];

    if(ingredient) {
      ingredient.count = item.count;
    }
  });

  return {
    ingredientsStatus: status,
    ingredientsData: ingredients
  };
}


export { fetchPendingOrder, parseOrder }; 