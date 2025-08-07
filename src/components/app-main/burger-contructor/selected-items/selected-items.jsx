import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import selectedItemsSTyles from './selected-items.module.css';

const SelectedItems = ({ selectedData, changeCount }) => {
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
          {bunData && <ConstructorElement 
            isLocked={true} 
            type='top' 
            text={`${bunData.name} (верх)`} 
            price={bunData.price} 
            thumbnail={bunData.image} 
            key={'-1'}
          />}
          
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
                <li>
                  <ConstructorElement  {...constructorProps} handleClose={() => changeCount(item, 'decrement')} key={`${item._id}_${j}`}/>
                </li>
              );
    
            }
    
            return constructorElements;
          }).flat()}

          {bunData && <ConstructorElement 
            isLocked={true} 
            type='bottom' 
            text={`${bunData.name} (низ)`} 
            price={bunData.price} 
            thumbnail={bunData.image}
            key={'-2'}
          />}
        </ul>
      </section>
    );
}


export default SelectedItems;