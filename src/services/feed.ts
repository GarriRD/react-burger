import { OrderData } from "types"

const baseUrl = 'https://norma.education-services.ru/api/orders'

const fetchOrder = async (number: number): Promise<OrderData | undefined> => {

  const res =  await fetch(`${baseUrl}/${number}`)
  .then(res => {
    if(!res.ok) {
      throw new Error('non ok server response');
    }

    return res.json();
  }).then((data: { success: boolean, orders: OrderData[]}) => {
    if(!data.success) {
      throw new Error('non success server response');
    }
    
    return data.orders[0];
  }).catch(() => undefined);

  return res;
};

export { fetchOrder };
