import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import orderDetailsStyles from './order-details.module.css';
import textStyles from 'styles/text.module.css';
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const { orderLoad, orderError, orderId } = useSelector(store => store.order);

  return (
    <span className={orderDetailsStyles.wrapper}>
      {orderLoad
      ? <span className={'text text_type_main-default'}>Оформляем заказ...</span>
      : orderError
      ? <span className={'text text_type_main-default'}>
          Ошибка при оформлении заказа. Пожалуйста, попробуйте снова или обратитесь в поддержку
        </span>
      : 
      <>
        <span className={'text text_type_digits-large'}>{orderId}</span>
        <span className={'text text_type_main-default'}>Идентификатор заказа</span>
        <span className={orderDetailsStyles.mark}>
          <CheckMarkIcon type={'primary'}/>
        </span>
        <span className={'text text_type_main-small'}>Ваш заказ начали готовить</span>
        <span className={`text text_type_main-small ${textStyles.secondary}`}>
          Дождитесь готовности на орбитальной станции
        </span>
      </>
      }
    </span>
  );
}

export default OrderDetails;