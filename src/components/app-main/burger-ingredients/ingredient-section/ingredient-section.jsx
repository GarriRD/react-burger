import Ingredient from "./ingredient/ingredient"
import ingredientSectionStyles from './ingredient-section.module.css';
import { useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import { ingredientDataProp, scrollPosProp } from "utils/props-types";
import { useDispatch, useSelector } from "react-redux";
import ingredinetsSlice from "services/actions/ingredients-slice";

const IngredientSection = ({title, type, ingredientsData, scrollRef, sectionRef}) => {
  const dispatch = useDispatch();
  const { setCurrentSection } = ingredinetsSlice.actions;
  
  const subSectionRef = useRef();
  const currentSection = useSelector(store => store.ingredients.currentSection);

  useEffect(() => {
    let cleanUp = undefined;

    // Если текущее положение бегунка не сохранено переключиться на нужную секцию
    // в противном случае перейти на сохранённую позицию
    // необходимо, чтобы при ререндерах окно не прыгало по секциям
    if (currentSection === type) {
      const handleScroll = () => {
        scrollRef.current = {top: sectionElement.scrollTop, left: sectionElement.scrollLeft};
      }

      const sectionElement = sectionRef.current;
      
      if(scrollRef.current) {
        sectionElement.scrollTo(scrollRef.current.left, scrollRef.current.top);
      } else {
        subSectionRef.current.scrollIntoView()
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
    const sectionElement = sectionRef.current;
    const subSectionElement = subSectionRef.current;

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
    <div className={ingredientSectionStyles.wrapper} ref={subSectionRef}>
      <h2 className={'text text_type_main-large'} >{title}</h2>
      
      <ul className={ingredientSectionStyles.ingredients}>
        {ingredientsData.map((item, i) => {
          return <Ingredient key={i} ingredientData={item} />
        })}
      </ul>
    </div>
  );
}

IngredientSection.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  ingredientsData: PropTypes.arrayOf(ingredientDataProp).isRequired,
  scrollRef: PropTypes.oneOfType(PropTypes.func, scrollPosProp).isRequired,
  sectionRef: PropTypes.oneOfType(PropTypes.func, PropTypes.element).isRequired
}

export default IngredientSection;