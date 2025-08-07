import { useCallback, useState } from 'react';
import appMainStyles from './app-main.module.css';
import BurgerIngredients from './burger-ingredients/burger-ingredients';
import BurgerConstructor from './burger-contructor/burger-constructor';


const AppMain = ({ ingredientsData }) => {
  // Убрал функционал добавления предметов по клику мишы в конструктор
  const [currentData, setCurrentData] = useState(ingredientsData);
  
  const changeCount = useCallback((ingredientProp, operation) => {  
    const data = currentData.filter(item => item._id === ingredientProp._id)[0];
    
    if (operation === 'increment') {
      data.count = data.count + 1;
    } else {
      data.count = data.count - 1;
    }

    setCurrentData([...currentData]);
  }, [currentData]);
  
  // теперь данные по булке определяются в selected-items, а а сам заказ изначально имеет хотя бы одну булку
  const selectedData = currentData.filter(item => item.count > 0);

  return (
    <main className={appMainStyles.main}>
      <BurgerIngredients data={currentData}/>
      <BurgerConstructor selectedData={selectedData} changeCount={changeCount} />
    </main>
  );
}

export default AppMain;