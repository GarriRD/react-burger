import Ingredient from "./ingredient/ingredient"
import ingredientSectionStyles from './ingredient-section.module.css';
import { FC, useEffect, useRef } from "react";
import ingredinetsSlice from "services/actions/ingredients-slice";
import { IngredientSectionProps } from "./type";
import { useAppDispatch, useAppSelector } from "services/hooks";

const IngredientSection: FC<IngredientSectionProps> = ({title, type, ingredientsData, scrollRef, sectionRef}) => {
  const dispatch = useAppDispatch();
  const { setCurrentSection } = ingredinetsSlice.actions;
  
  const subSectionRef = useRef<HTMLDivElement>(null);
  const currentSection = useAppSelector(store => store.ingredients.currentSection);

  useEffect(() => {
    let cleanUp = undefined;

    // Если текущее положение бегунка не сохранено переключиться на нужную секцию
    // в противном случае перейти на сохранённую позицию
    // необходимо, чтобы при ререндерах окно не прыгало по секциям
    if (currentSection === type) {
      const sectionElement = sectionRef.current!;

      const handleScroll = () => {
        scrollRef.current = {top: sectionElement.scrollTop, left: sectionElement.scrollLeft};
      }
      
      
      if(scrollRef.current) {
        sectionElement.scrollTo(scrollRef.current.left, scrollRef.current.top);
      } else {
        subSectionRef.current!.scrollIntoView()
      }

      sectionElement.addEventListener('scroll', handleScroll);

      cleanUp = () => {
        sectionElement.removeEventListener('scroll', handleScroll);
      }
    }

    return cleanUp;
  });
  // Проверка где находится верхняя граница окна, чтобы переключить секцию ингредиентов
  useEffect(() => {
    const sectionElement = sectionRef.current!;
    const subSectionElement = subSectionRef.current!;

    const handleScroll = () => {
      const sectionBox = sectionElement.getBoundingClientRect();
      const subSectionBox = subSectionElement.getBoundingClientRect();

      if(type !== currentSection && sectionBox.top >= subSectionBox.top && sectionBox.top < subSectionBox.bottom) {
        dispatch(setCurrentSection(type));
      }
    }

    sectionElement.addEventListener('scroll', handleScroll);

    return () => {
      sectionElement.removeEventListener('scroll', handleScroll);
    }
  })

  return (
    <div className={ingredientSectionStyles.wrapper} ref={subSectionRef} data-testid='burger-section'>
      <h2 className={'text text_type_main-large'} >{title}</h2>
      
      <ul className={ingredientSectionStyles.ingredients}>
        {ingredientsData.map((item, i) => {
          return <Ingredient key={i} ingredientData={item} />
        })}
      </ul>
    </div>
  );
}

export default IngredientSection;