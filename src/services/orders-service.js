/* 
  Сервис для получения и обработки(при необходимости) данных о заказах
*/


/* 
  Получить текущий заказ.

  фукнция имитирует получение данных заказа.
  Возвращает идентификаторы ингредиентов и их кол-во
*/

const orderIdUrl = 'https://norma.nomoreparties.space/api/orders';

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


const fetchOrderData = async (ingredientsData, abortSignal) => {
  let ids = new Set(ingredientsData.map(item => item._id));
  
  ids = JSON.stringify({
    ingredients: [...ids]
  });
  
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: ids,
    signal: abortSignal
  }


  const data = fetch(orderIdUrl, options)
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    throw new Error('Ошибка при оформлении заказа, non ok response');
  }).then(data => {

    if(data.success) {
      return data;
    }

    throw new Error('Ошибка при оформлении заказа, success status is false');
  })
  .catch(() => null);

    

  return data;
};


export { fetchPendingOrder, parseOrder, fetchOrderData }; 

