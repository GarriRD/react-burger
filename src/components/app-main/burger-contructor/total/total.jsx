import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import totalStyles from './total.module.css';


const Total = ({ totalIngredientsData }) => {
  const total = totalIngredientsData.reduce((acc, curr) => acc + curr.price * curr.count, 0);

  return (
    <span className={totalStyles.wrapper}>
      <span className='text text_type_main-large'>{total}</span>
      <CurrencyIcon type='primary' />
      <Button htmlType="button" type="primary" size="large">Оформить</Button>
    </span>
  );
}

export default Total;