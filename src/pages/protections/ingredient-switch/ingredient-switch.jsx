import IngredientDetails from "components/app-main/burger-ingredients/ingredient-details/ingredient-details";
import App from "components/app/app";
import Notice from "components/notice/notice";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { getIngredients } from "services/actions/ingredients-slice";
import ingredientSwitchStyles from './ingredient-switch.module.css';

const IngredientSwitch = () => {
  const { ingredients, ingredientsLoad } = useSelector(store => store.ingredients);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { state } = useLocation();
  const controller = useMemo(() => new AbortController(), []);
  
  useEffect(() => {

    return () => {
      controller.abort();
    }
  }, [controller]);

  if(state && state.modal) {
    return <App />
  }
  
  if(ingredients.length === 0) {
    if(!ingredientsLoad) {
      dispatch(getIngredients(controller.signal));
    }

    return <Notice type={'loading'} />
  }

  return (
    <span className={ingredientSwitchStyles.wrapper}>
      <IngredientDetails id={id} standAlone/>
    </span>)
  

}


export default IngredientSwitch;