/* 
  Сервис для получения и обработки(при необходимости) данных о заказах
*/

import { OrderResponse, ServiceResponse } from "types";
import { AllIngredients } from "types/order";


/* 
  Получить текущий заказ.

  фукнция имитирует получение данных заказа.
  Возвращает идентификаторы ингредиентов и их кол-во
*/

const orderIdUrl = 'https://norma.education-services.ru/api/orders';


const fetchOrderData = 
async (
  ingredientsData: AllIngredients, 
  token: string,
  abortSignal?: AbortSignal): ServiceResponse<OrderResponse> => {
  const idsSet = new Set(ingredientsData.map(item => item._id));
  
  const ids = JSON.stringify({
    ingredients: [...idsSet]
  });
  
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Authorization': token,
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
  .catch(() => ({ success: false, message: 'Ошибка при попытке оформления заказа'}) );


  return data;
};


export { fetchOrderData }; 

