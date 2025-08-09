import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import orderDetailsStyles from './order-details.module.css';
import textStyles from 'styles/text.module.css';
import Modal from "components/modal/modal";
import PropTypes from 'prop-types';

const OrderDetails = ({ setIsVisible, orderId }) => {
  return (
    <Modal setIsVisible={setIsVisible}>
      <span className={orderDetailsStyles.wrapper}>
        <span className={'text text_type_digits-large'}>{orderId}</span>
        <span className={'text text_type_main-default'}>Идентификатор заказа</span>
        <span className={orderDetailsStyles.mark}>
          <CheckMarkIcon type={'primary'}/>
        </span>
        <span className={'text text_type_main-small'}>Ваш заказ начали готовить</span>
        <span className={`text text_type_main-small ${textStyles.secondary}`}>
          Дождитесь готовности на орбитальной станции
        </span>
      </span>
    </Modal>
  );
}

OrderDetails.propTypes = {
  setIsVisible: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired,
}

export default OrderDetails;