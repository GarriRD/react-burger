import { useCallback, useState, useMemo } from 'react';
import appMainStyles from './app-main.module.css';
import BurgerIngredients from './burger-ingredients/burger-ingredients';
import BurgerConstructor from './burger-contructor/burger-constructor';
import PropTypes from 'prop-types';
import { ingredientDataProp } from 'utils/props-types';


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
  
  // теперь данные по булке определяются в selected-items, а сам заказ изначально имеет хотя бы одну булку
  const selectedData = useMemo(() => currentData.filter(item => item.count > 0), [currentData]);

  return (
    <main className={appMainStyles.main}>
      <BurgerIngredients data={currentData}/>
      <BurgerConstructor selectedData={selectedData} changeCount={changeCount} />
    </main>
  );
}

AppMain.propTypes = {
  ingredientsData: PropTypes.arrayOf(ingredientDataProp).isRequired,
}

export default AppMain;