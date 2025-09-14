import IngredientDetails from "components/app-main/burger-ingredients/ingredient-details/ingredient-details"
import Modal from "components/modal/modal"
import { useNavigate, useParams } from "react-router";

const IngredientModal = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 

  return (
    <Modal modalSwitcher={() => navigate('/')}>
      <IngredientDetails id={id} />
    </Modal>
  );
};


export default IngredientModal;