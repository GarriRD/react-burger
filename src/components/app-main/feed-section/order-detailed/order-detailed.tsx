import Notice from "components/notice/notice";
import { FC, ReactNode, useEffect, useState } from "react";
import { fetchOrder } from "services/feed";
import { useAppSelector } from "services/hooks";
import { OrderData, TIngredientItem } from "types";
import { parseDate, parseStatus } from "utils/order";
import orderDetailedStyles from './order-detailed.module.css';
import textStyles from 'styles/text.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import StyledText from "components/app-main/styled-text/styled-text";

const OrderDetailed: FC<{ number: number }> = ({ number }) => {
  const { orders } = useAppSelector(store => store.feed);
  const [pending, setPending] = useState<boolean>(true);
  const [orderData, setOrderData] = useState<OrderData | undefined>();
  const ingredients = useAppSelector(store => store.ingredients.ingredients);
  const price = orderData?.ingredients.reduce((acc, item) => acc + ingredients.filter(ing => ing._id === item)[0].price, 0);

  useEffect(() => {
    const action = async () => {
      let order = orders?.filter(item => item.number === number)[0];
      if(!order) {
        order = await fetchOrder(number);
        console.log('order fetched', order);
      }
    
      setOrderData(order);
      setPending(false);
    };

    action();
  }, []);

  if(pending) {
    return <Notice type="loading" />
  }
  console.log('pending !orderData', pending, !orderData);
  if(!orderData) {
    return <Notice type="error" />
  }

  const ingredientsCounts = orderData.ingredients.reduce((acc, item) => {
    if(item in acc) {
      acc[item][1]++;
    } else {
      const ingredient = ingredients.filter(ing => ing._id === item)[0];
      acc[item] = [ingredient, 1];
    }

    return acc;
  }, {} as Record<string, [TIngredientItem, number]>);

  const details: ReactNode = (
    <span className={orderDetailedStyles.wrapper}>
      <span className={`${textStyles.secondary} text text_type_digits-small ${orderDetailedStyles.number}`}>
        #{orderData.number}
      </span>
      {
        orderData.status 
        && <span className={`text text_type_main-small ${orderDetailedStyles[orderData.status]}`}>
            {parseStatus(orderData.status)}
          </span>
      }
      <span className={`text text_type_main-medium ${orderDetailedStyles.text}`}>{orderData.name}</span>
      <span className={`text text_type_main-medium ${orderDetailedStyles.text}`}>Состав:</span>
      <div className={orderDetailedStyles['row-container']}>
        {Object.values(ingredientsCounts).map(([item, count], idx) => {
          return (
            <span className={orderDetailedStyles.row} key={idx}>
              <img src={item.image} alt={item.name} className={orderDetailedStyles.icon}/>
              <span>{item.name}</span>
              <span className={orderDetailedStyles.price}>
                <label>{count}</label>
                <label>x</label>
                <label>{item.price}</label>
                <CurrencyIcon type='primary' />
              </span>
            </span>
          )
        })}
      </div>
      <span className={orderDetailedStyles.footer}>
        <StyledText type='main' size='small' extraClass={[textStyles.secondary]}>{parseDate(orderData.createdAt)}</StyledText>
        <div className={orderDetailedStyles.price}>
          <label>{price}</label>
          <CurrencyIcon type='primary' />
        </div>
      </span>
    </span>
  )

  return (
    <>
      {details}
    </>
  );
}

export default OrderDetailed;