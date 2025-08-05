import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import selectedItemsSTyles from './selected-items.module.css';
import {v4} from 'uuid';

const SelectedItems = ({ bunData, selectedData, changeCount }) => {
  return (
      <section className={selectedItemsSTyles.section}>
        {<ConstructorElement 
            isLocked={true} 
            type='top' 
            text={`${bunData.name} (верх)`} 
            price={bunData.price} 
            thumbnail={bunData.image} 
          />}
        <ul className={selectedItemsSTyles.selection}>
          {selectedData.map((item, i) => {
            const constructorElements = [];
            const constructorProps = {
              text: item.name,
              price: item.price,
              thumbnail: item.image,
            };
            const k = v4();
            console.log(k);
            for (let j = 0; j < item.count; j++) {
              constructorElements.push(
                <li>
                  <ConstructorElement  {...constructorProps} handleClose={() => changeCount(item, 'decrement')} key={v4()}/>
                </li>
              );
    
            }
    
            return constructorElements;
          }).flat()}
        </ul>
        {<ConstructorElement 
            isLocked={true} 
            type='bottom' 
            text={`${bunData.name} (низ)`} 
            price={bunData.price} 
            thumbnail={bunData.image}
          />}
      </section>
    );
}


export default SelectedItems;