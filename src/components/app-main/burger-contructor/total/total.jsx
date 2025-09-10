import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import totalStyles from './total.module.css';
import { useLayoutEffect, useMemo, useState } from 'react';
import OrderDetails from './order-details/order-details';
import Modal from 'components/modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import orderSlice, { getOrderData } from 'services/actions/order-slice';
import { useNavigate } from 'react-router';
import { getCookie } from 'services/utils';
import { getUser } from 'services/actions/user-slice';

const Total = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bunData = useSelector(store => store.selectedIngredients.selectedBun);
  const ingredientsData = useSelector(store => store.selectedIngredients.selectedIngredients);
  const orderModalVisible = useSelector(store => store.order.orderModalVisible);
  const [emptyError, setEmptyError] = useState(false);
  const controller = useMemo(() => new AbortController());
  
  const { modalSwitch } = orderSlice.actions;

  const total = useMemo(() => {
    let bunPrice = 0;
    if(!!bunData) {
      bunPrice = bunData.price * 2
    }
    return ingredientsData.reduce((acc, curr) => acc + curr.price, 0) + bunPrice;
  }, [ingredientsData, bunData]);

  const modalSwitcher = () => {
    dispatch(modalSwitch());
  };

  useLayoutEffect(() => {
    return () => {
      controller.abort();
    }
  }, [controller])


  const orderDetails = (orderModalVisible 
    && <Modal modalSwitcher={modalSwitcher}>
        <OrderDetails/>
      </Modal>
  )
  
  const loadOrder = () => {
    if(!!getCookie('refreshToken')){
      if(!getCookie('token')) {
        setEmptyError(false);
        dispatch(getUser(controller.signal));
      } else if(ingredientsData.length === 0 && !bunData) {
        setEmptyError(true);
      } else {
        
        const allIngredients = []

        if(ingredientsData.length > 0) {
          allIngredients.push(...ingredientsData);
        }

        if(!!bunData) {
          allIngredients.push(bunData);
        }
        setEmptyError(false);
        dispatch(getOrderData({ allIngredientsData: [...allIngredients] }));
        dispatch(modalSwitch());
      }

      
    } else {
      navigate('/login')
    }
  }

  return (
    <span className={totalStyles.wrapper}>
      {orderDetails}
      {emptyError && <span className='text text_type_main-small' style={{color: 'red'}}>Заказ не может быть пустым</span>}
      <span className='text text_type_main-large'>{total}</span>
      <CurrencyIcon type='primary' />
      <Button htmlType="button" type="primary" size="large" onClick={loadOrder}>Оформить</Button>
    </span>
  );
}

export default Total;