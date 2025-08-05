import burgerConstructorStyles from './burger-constructor.module.css';
import SelectedItems from "./selected-items/selected-items";
import Total from "./total/total";

const BurgerConstructor = ({ bunData, selectedData, changeCount }) => {

  const bunPricing = {
    price: bunData.price,
    count: 2
  }
  
  return (
    <section className={burgerConstructorStyles.section} >
      <SelectedItems bunData={bunData} selectedData={selectedData} changeCount={changeCount} />
      <Total totalIngredientsData={[...selectedData, bunPricing]} />
    </section>
  )
}

export default BurgerConstructor;