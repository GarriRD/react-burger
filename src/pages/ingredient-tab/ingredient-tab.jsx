import IngredientDetails from "components/app-main/burger-ingredients/ingredient-details/ingredient-details";
import { useParams } from "react-router";
import ingredientTabStyles from './ingredient-tab.module.css';

const IngredientTab = () => {
  const { id } = useParams();

  return (
    <span className={ingredientTabStyles.wrapper}>
      <IngredientDetails id={id} standAlone/>
    </span>)
  

}


export default IngredientTab;