import appMainStyles from './app-main.module.css';
import BurgerIngredients from './burger-ingredients/burger-ingredients';
import BurgerConstructor from './burger-contructor/burger-constructor';
import { FC } from 'react';


const AppMain: FC = () => {
  
  return (
    <main className={appMainStyles.main}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
}

export default AppMain;