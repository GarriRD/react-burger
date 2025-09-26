import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import orderDetailsStyles from './order-details.module.css';
import textStyles from 'styles/text.module.css';
import { Oval } from "react-loader-spinner";
import { useAppSelector } from "services/hooks";
import { FC } from "react";

const OrderDetails: FC = () => {
  const { orderLoad, orderError, orderId } = useAppSelector(store => store.order);

  return (
    <span className={orderDetailsStyles.wrapper}>
      {orderLoad
      ? <span className={`text text_type_main-default ${orderDetailsStyles.loader}`}>
          <Oval color='silver' secondaryColor='grey' height={50} width={70} />
          Оформляем заказ...
        </span>
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