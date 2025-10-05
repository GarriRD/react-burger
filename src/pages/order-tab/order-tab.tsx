import Notice from "components/notice/notice";
import orderTabStyles from './order-tab.module.css';
import { useParams } from "react-router";
import OrderDetailed from "components/app-main/feed-section/order-detailed/order-detailed";

const OrderTab = () => {
  const { number } = useParams();

  if(!number) {
    return <Notice type={'error'} />
  }

  return (
    <span className={orderTabStyles.wrapper}>
      <OrderDetailed number={parseInt(number)}/>
    </span>)
  

}

export default OrderTab;