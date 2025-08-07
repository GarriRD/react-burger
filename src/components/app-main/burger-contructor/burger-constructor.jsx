import burgerConstructorStyles from './burger-constructor.module.css';
import SelectedItems from "./selected-items/selected-items";
import Total from "./total/total";

const BurgerConstructor = ({ selectedData, changeCount }) => {
  
  return (
    <section className={burgerConstructorStyles.section} >
      <SelectedItems selectedData={selectedData} changeCount={changeCount} />
      <Total totalIngredientsData={selectedData} />
    </section>
  )
}

export default BurgerConstructor;