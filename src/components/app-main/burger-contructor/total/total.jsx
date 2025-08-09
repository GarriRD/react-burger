import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import totalStyles from './total.module.css';
import { useState } from 'react';
import OrderDetails from './order-details/order-details';
import PropTypes from 'prop-types';
import { ingredientDataProp } from 'utils/props-types';

const orderId = '034536'


const Total = ({ totalIngredientsData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const total = totalIngredientsData.reduce((acc, curr) => acc + curr.price * curr.count, 0);

  const handleClick = e => {
    setIsVisible(true);
  }

  const orderDetails = isVisible && <OrderDetails setIsVisible={setIsVisible} orderId={orderId} />

  return (
    <span className={totalStyles.wrapper}>
      {orderDetails}
      <span className='text text_type_main-large'>{total}</span>
      <CurrencyIcon type='primary' />
      <Button htmlType="button" type="primary" size="large" onClick={handleClick}>Оформить</Button>
    </span>
  );
}

Total.propTypes = {
  totalIngredientsData: PropTypes.arrayOf(ingredientDataProp).isRequired,
}

export default Total;