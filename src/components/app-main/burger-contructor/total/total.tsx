import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import totalStyles from './total.module.css';
import { FC, useMemo, useState } from 'react';
import OrderDetails from './order-details/order-details';
import Modal from 'components/modal/modal';
import orderSlice, { getOrderData } from 'services/actions/order-slice';
import { useNavigate } from 'react-router';
import { getCookie, setCookie } from 'services/utils';
import { renewToken } from 'services/auth';
import { Oval } from 'react-loader-spinner';
import { useAppDispatch, useAppSelector } from 'services/hooks';
import { TIngredientItem, TSelectedIngredient } from 'types';

const Total: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const bunData = useAppSelector(store => store.selectedIngredients.selectedBun);
  const ingredientsData = useAppSelector(store => store.selectedIngredients.selectedIngredients);
  const orderModalVisible = useAppSelector(store => store.order.orderModalVisible);
  const [sending, setSending] = useState<boolean>(false);
  
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


  const orderDetails = (orderModalVisible 
    && <Modal modalSwitcher={modalSwitcher}>
        <OrderDetails/>
      </Modal>
  )

  const dispachOrder = (bun: TIngredientItem | null, ingredients: TSelectedIngredient[]) => {
    const allIngredients = []

    if(!!bun) {
      allIngredients.push(bun);
    }
  
    if(ingredients.length > 0) {
      allIngredients.push(...ingredientsData);
    }
    
    dispatch(getOrderData({ allIngredientsData: [...allIngredients] }));
    dispatch(modalSwitch());  
  }
  
  const loadOrder = () => {
    const action = async () => {

      if(!!getCookie('refreshToken')) {
        if (!getCookie('token')) {
            const newToken = await renewToken(getCookie('refreshToken')!);
            
            if(newToken.success) {
              
              setCookie('token', newToken.accessToken, { expires: 20 * 60 });
              setCookie('refreshToken', newToken.refreshToken, { expires: 24 * 60 * 60 });
      
              dispachOrder(bunData, ingredientsData);
              
            } else {
              navigate('/');
            }
            
        } else {
          dispachOrder(bunData, ingredientsData);
        }
        
      } else {
        navigate('/login')
      }
      setSending(false);
    };

    setSending(true);
    action()
    
  }

  return (
    <span className={totalStyles.wrapper}>
      {orderDetails}
      <span className='text text_type_main-large'>{total}</span>
      <CurrencyIcon type='primary' />
      {sending && <Oval color='silver' secondaryColor='grey' width={40} height={40} /> }
      <Button htmlType="button" type="primary" size="large" onClick={loadOrder} disabled={!bunData || sending}>Оформить</Button>
    </span>
  );
}

export default Total;