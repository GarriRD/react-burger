import { useCallback, useState } from 'react';
import appMainStyles from './app-main.module.css';
import BurgerIngredients from './burger-ingredients/burger-ingredients';
import ingredientsData from 'utils/data';
import BurgerConstructor from './burger-contructor/burger-constructor';


const AppMain = () => {
  const [currentData, setCurrentData] = useState(ingredientsData.map(item => {
    return {
      ...item,
      count: 0,
    }
  }));
  
  const changeCount = useCallback((ingredientProp, operation) => {  
    const data = currentData.filter(item => item._id === ingredientProp._id)[0];
    
    if (operation === 'increment') {
      data.count = data.count + 1;
    } else {
      data.count = data.count - 1;
    }

    setCurrentData([...currentData]);
  }, [currentData]);


  const bunData = currentData.filter(item => item.type === 'bun')[0];
  const selectedData = currentData.filter(item => item.count > 0);

  return (
    <main className={appMainStyles.main}>
      <BurgerIngredients data={currentData} changeCount={changeCount} />
      <BurgerConstructor bunData={bunData} selectedData={selectedData} changeCount={changeCount} />
    </main>
  );
}

export default AppMain;