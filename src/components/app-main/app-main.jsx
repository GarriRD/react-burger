import appMainStyles from './app-main.module.css';
import BurgerIngredients from './burger-ingredients/burger-ingredients';
import BurgerConstructor from './burger-contructor/burger-constructor';


const AppMain = () => {
  
  return (
    <main className={appMainStyles.main}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
}

export default AppMain;