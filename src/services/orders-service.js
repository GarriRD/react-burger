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
      _id: '60666c42cc7b410027a1a9b1',
      count: 1,
    },
    {
      _id: '60666c42cc7b410027a1a9bb',
      count: 2,
    },
    {
      _id: '60666c42cc7b410027a1a9b9',
      count: 1,
    },
    {
      _id: '60666c42cc7b410027a1a9b4',
      count: 1,
    },
    {
      _id: '60666c42cc7b410027a1a9bc',
      count: 1,
    },
    {
      _id: '60666c42cc7b410027a1a9be',
      count: 2,
    }

  ];
};


/* Функция для получения данных для конструктора из инредиентов и заказа */
const parseOrder = (ingredientsData, orderData) => {
  let status = 'success';
  
  const ingredients = ingredientsData.map(item => {
    return {...item, count: 0}
  });



  orderData.forEach(item => {
    const ingredient = ingredients.filter(ingredientItem => ingredientItem._id === item._id)[0];

    if(!ingredient) {
      status = 'incomplete';
    } else {
      ingredient.count = item.count;
    }
  });

  return {
    ingredientsStatus: status,
    ingredientsData: ingredients
  };
}


export { fetchPendingOrder, parseOrder }; 