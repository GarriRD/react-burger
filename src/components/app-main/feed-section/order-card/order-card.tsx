import { FC, ReactNode, useMemo, useState } from "react";
import orderCardStyles from './order-card.module.css';
import { useAppSelector } from "services/hooks";
import textStyles from 'styles/text.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderData, TIngredientItem } from "types";
import { useNavigate } from "react-router";
import { parseDate, parseStatus } from "utils/order";
import Notice from "components/notice/notice";

const parseImgs = (imgs: string[]): ReactNode => {
  const additional = imgs.length > 4;
  const partialImgs = imgs.slice(0, 4);

  return (
    <span className={orderCardStyles.icons}>
      {partialImgs.map((item, i) => {
        const style = { zIndex: partialImgs.length - i} as Record<string, string | number>;
        if(additional && i === partialImgs.length - 1) {

          return (
            <div style={style} key={i} className={orderCardStyles['icon-suffix']} >
              <span className={` ${orderCardStyles['icon-suffix-count']} text text_type_digits-small`}>+{imgs.length - 4}</span>
              <img alt="ingredient icon" src={item} className={orderCardStyles.icon} style={{filter: 'brightness(50%)'}}/>
            </div>
          );
        }

        return (
          <img alt="ingredient icon" src={item} className={orderCardStyles.icon} style={style} key={i}/>
        );

      })}
    </span>
  )
}

const OrderCard: FC<{ order: OrderData }> = ({ order}) => {
  const ingredients = useAppSelector(store => store.ingredients.ingredients);
  const dt = parseDate(order.createdAt);
  const navigate = useNavigate();

  let orderIngredients: TIngredientItem[] | undefined;
  orderIngredients = order?.ingredients.map(item => ingredients.filter(ing => ing._id === item)[0]);
  orderIngredients = orderIngredients.some(item => !item) ? undefined : orderIngredients;
  let price;

  if(orderIngredients) {
    price = orderIngredients.reduce((acc, item) => acc + item.price, 0);
  }

  const elems = useMemo(() => {
    if(orderIngredients) {
      const imgs = orderIngredients.map(item => item.image);
  
      return parseImgs(imgs);
    }
  }, [ingredients, order]);


  const showModal = () => {
    navigate(`${order.number}`, {
      state: {
        modal: true,
      } 
    });
  }

  if(!orderIngredients) {
    return <Notice type='error' extraClass={orderCardStyles.small}/>;
  }
  
  return (
    <section className={orderCardStyles.wrapper} onClick={showModal}>
      <span className={`${orderCardStyles.header} ${textStyles.secondary}`}>
        <span className="text text_type_digits-small">#{order.number}</span>
        <span className="text text_type_main-small">{dt}</span>
      </span>
      <span className={`${orderCardStyles.name} text text_type_main-medium`}>{order.name}</span>
      {order.status && <span className={`text text_type_main-small ${orderCardStyles[order.status]}`}>{parseStatus(order.status)}</span>}
      <span className={orderCardStyles.row}>
        {elems}
        <span className={orderCardStyles.price}>
          <span className={`"text text_type_digits-small"`}>{price}</span>
          <CurrencyIcon type='primary' />
        </span>
      </span>
      
    </section>
  )
};

export default OrderCard;