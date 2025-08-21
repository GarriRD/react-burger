import { useMemo } from 'react';
import appMainStyles from './app-main.module.css';
import BurgerIngredients from './burger-ingredients/burger-ingredients';
import BurgerConstructor from './burger-contructor/burger-constructor';
import { useSelector } from 'react-redux';


const AppMain = () => {
  const ingredientsData = useSelector(store => store.ingredients.ingredients);
  
  const selectedData = useMemo(() => ingredientsData.filter(item => item.count > 0), [ingredientsData]);

  return (
    <main className={appMainStyles.main}>
      <BurgerIngredients/>
      <BurgerConstructor selectedData={selectedData}/>
    </main>
  );
}

export default AppMain;