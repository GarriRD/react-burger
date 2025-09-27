import IngredientDetails from "components/app-main/burger-ingredients/ingredient-details/ingredient-details"
import Modal from "components/modal/modal"
import Notice from "components/notice/notice";
import { useNavigate, useParams } from "react-router";

const IngredientModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if(!id) {
    return <Notice type={'error'} />
  }

  return (
    <Modal modalSwitcher={() => navigate('/')}>
      <IngredientDetails id={id} />
    </Modal>
  );
};


export default IngredientModal;