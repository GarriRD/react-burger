import IngredientDetails from "components/app-main/burger-ingredients/ingredient-details/ingredient-details";
import { useParams } from "react-router";
import ingredientTabStyles from './ingredient-tab.module.css';
import Notice from "components/notice/notice";

const IngredientTab = () => {
  const { id } = useParams();

  if(!id) {
    return <Notice type={'error'} />
  }

  return (
    <span className={ingredientTabStyles.wrapper}>
      <IngredientDetails id={id} standAlone/>
    </span>)
  

}


export default IngredientTab;