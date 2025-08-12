import { useMemo } from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burger-constructor.module.css';
import SelectedItems from "./selected-items/selected-items";
import Total from "./total/total";
import { ingredientDataProp } from 'utils/props-types';

const BurgerConstructor = ({ selectedData, changeCount }) => {

  // добавил данных хук, т.к. обработчик событий в ConstructorElement постоянно форсил новые рендеры
  const selectedItems = useMemo(() => {
    return <SelectedItems selectedData={selectedData} changeCount={changeCount} />
  }, [selectedData, changeCount]);
  
  return (
    <section className={burgerConstructorStyles.section} >
      {selectedItems}
      <Total totalIngredientsData={selectedData} />
    </section>
  )
}

BurgerConstructor.propTypes = {
  selectedData: PropTypes.arrayOf(ingredientDataProp).isRequired,
  changeCount: PropTypes.func.isRequired,
}

export default BurgerConstructor;