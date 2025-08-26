import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import totalStyles from './total.module.css';
import { useMemo } from 'react';
import OrderDetails from './order-details/order-details';
import Modal from 'components/modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import orderSlice, { getOrderData } from 'services/actions/order-slice';

const Total = () => {
  const dispatch = useDispatch();
  const bunData = useSelector(store => store.selectedIngredients.selectedBun);
  const ingredientsData = useSelector(store => store.selectedIngredients.selectedIngredients);
  const orderModalVisible = useSelector(store => store.order.orderModalVisible);
  
  const { modalSwitch } = orderSlice.actions;

  const total = useMemo(() => {
    return ingredientsData.reduce((acc, curr) => acc + curr.price, 0) + bunData.price * 2;
  }, [ingredientsData, bunData]);

  const modalSwitcher = () => {
    dispatch(modalSwitch());
  }



  const orderDetails = (orderModalVisible 
    && <Modal modalSwitcher={modalSwitcher}>
        <OrderDetails/>
      </Modal>
  )


  const loadOrder = () => {
    dispatch(getOrderData({ allIngredientsData: [...ingredientsData, bunData] }));
    dispatch(modalSwitch());
  }

  return (
    <span className={totalStyles.wrapper}>
      {orderDetails}
      <span className='text text_type_main-large'>{total}</span>
      <CurrencyIcon type='primary' />
      <Button htmlType="button" type="primary" size="large" onClick={loadOrder}>Оформить</Button>
    </span>
  );
}

export default Total;