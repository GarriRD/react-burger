import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import selectedItemsSTyles from './selected-items.module.css';
import PropTypes from 'prop-types';
import { ingredientDataProp } from "utils/props-types";
import ingredinetsSlice from "store/ingredients/ingredients-slice";
import { useDispatch } from "react-redux";

const SelectedItems = ({ selectedData }) => {
  const { setIngredientCount } = ingredinetsSlice.actions;
  const dispatch = useDispatch();

  const bunData = selectedData.filter(item => item.type === 'bun')[0];
  
  if(bunData) {
    selectedData = selectedData.filter(item => item._id !== bunData._id);

    if(bunData.count > 1) {
      selectedData.push({...bunData, count: bunData.count - 1})
    }
  }

  return (
      <section className={selectedItemsSTyles.section}>
        {/* занёс неизменяемые элементы в тело списка, чтобы они не находились отдельно 
            вне семантического блока верстки
        */}
        <ul className={selectedItemsSTyles.selection}>
          <li key={-1}>
            {bunData && <ConstructorElement 
              isLocked={true} 
              type='top' 
              text={`${bunData.name} (верх)`} 
              price={bunData.price} 
              thumbnail={bunData.image} 
            />}
          </li>
          
          {selectedData.map((item, i) => {
            const constructorElements = [];
            const constructorProps = {
              text: item.name,
              price: item.price,
              thumbnail: item.image,
            };
            
  
            for (let j = 0; j < item.count; j++) {
              // заменил создание ключа, вместо v4() теперь уникальный id ингредиента + его его индекс в счётчике количества
              constructorElements.push(
                <li key={`${item._id}_${j}`}>
                  <ConstructorElement  {...constructorProps}  handleClose={() => dispatch(setIngredientCount({id: item._id, newCount: item.count - 1}))}/>
                </li>
              );
    
            }
    
            return constructorElements;
          }).flat()}
          <li key={-2}>
            {bunData && <ConstructorElement 
              isLocked={true} 
              type='bottom' 
              text={`${bunData.name} (низ)`} 
              price={bunData.price} 
              thumbnail={bunData.image}
            />}
          </li>
        </ul>
      </section>
    );
}

SelectedItems.propTypes = {
  selectedData: PropTypes.arrayOf(ingredientDataProp).isRequired,
  changeCount: PropTypes.func.isRequired,
}


export default SelectedItems;