import OrderDetailed from "components/app-main/feed-section/order-detailed/order-detailed";
import Modal from "components/modal/modal"
import Notice from "components/notice/notice";
import { useLocation, useNavigate, useParams } from "react-router";

const OrderModal = () => {
  const { number } = useParams();
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const parentPath = path.substring(0, path.lastIndexOf('/'));

  if(!number) {
    return <Notice type={'error'} />
  }

  return (
    <Modal modalSwitcher={() => navigate(parentPath)}>
      <OrderDetailed number={parseInt(number)} />
    </Modal>
  );
};


export default OrderModal;