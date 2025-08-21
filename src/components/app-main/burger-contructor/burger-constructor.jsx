import { useMemo } from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burger-constructor.module.css';
import SelectedItems from "./selected-items/selected-items";
import Total from "./total/total";
import { ingredientDataProp } from 'utils/props-types';

const BurgerConstructor = ({ selectedData }) => {

  // добавил данных хук, т.к. обработчик событий в ConstructorElement постоянно форсил новые рендеры
  const selectedItems = useMemo(() => {
    return <SelectedItems selectedData={selectedData} />
  }, [selectedData]);
  
  return (
    <section className={burgerConstructorStyles.section} >
      {selectedItems}
      <Total totalIngredientsData={selectedData} />
    </section>
  )
}

BurgerConstructor.propTypes = {
  selectedData: PropTypes.arrayOf(ingredientDataProp).isRequired,
}

export default BurgerConstructor;