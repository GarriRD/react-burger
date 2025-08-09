import Modal from "components/modal/modal";
import ingredientDetailsStyles from './ingredient-details.module.css';
import textStyles from 'styles/text.module.css';
import PropTypes from 'prop-types';
import { ingredientDataProp } from "utils/props-types";

const IngredientDetails = ({ ingredientData, setIsVisible }) => {
  const details = {
    'Калории, ккал': ingredientData.calories,
    'Белки, г': ingredientData.proteins,
    'Жиры. г': ingredientData.fat,
    'Углеводы. г': ingredientData.carbohydrates,
  }

  

  return (
    <Modal setIsVisible={setIsVisible}>
      <div className={ingredientDetailsStyles.wrapper} >
        <span className={ingredientDetailsStyles.preview} >
          <img src={ingredientData.image_large} alt={`ingredient ${ingredientData.name}`} />
        </span>
        <span className={`${ingredientDetailsStyles.name} text text_type_main-default`}>
          {ingredientData.name}
        </span>
        <ul className={`${ingredientDetailsStyles.details} text text_type_main-default`}>
          {Object.entries(details).map(([key, value], i) => {
            return (
              <li className={ingredientDetailsStyles['details-item']} key={i}>
                <span className={textStyles.secondary}>{key}</span>
                <span className={textStyles.secondary}>{value}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </Modal>
  );
}

IngredientDetails.propTypes = {
  ingredientData: ingredientDataProp.isRequired,
  setIsVisible: PropTypes.func.isRequired,
}

export default IngredientDetails;