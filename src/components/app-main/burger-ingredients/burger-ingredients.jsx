import { useLayoutEffect, useMemo, useRef } from "react";
import TabOptions from "./tab-options/tab-options";
import IngredientSection from "./ingredient-section/ingredient-section";
import burgerIngredientsStyles from './burger-ingredients.module.css';
import {  useDispatch, useSelector } from "react-redux";
import Modal from "components/modal/modal";
import IngredientDetails from "./ingredient-details/ingredient-details";
import { useLocation, useNavigate, useParams } from "react-router";
import selectedIngredientsSlice from "services/actions/selected-ingredients-slice";

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ingredientsData = useSelector(store => store.ingredients.ingredients);
  const sectionRef = useRef();
  const scrollRef = useRef(null);
  const { id } = useParams();
  const { state } = useLocation();
  
  const ingredientDetails = (id
    && <Modal modalSwitcher={() => navigate('/')}>
        <IngredientDetails id={id} />
      </Modal>
  )

  const ingredientSections = useMemo(() => {
    const buns = ingredientsData.filter(item => item.type === 'bun');
    const sauces = ingredientsData.filter(item => item.type === 'sauce');
    const mains = ingredientsData.filter(item => item.type === 'main');

    const sections = [
      ['Булки', 'bun', buns],
      ['Соусы', 'sauce', sauces],
      ['Начинка', 'main', mains],
    ];

    return (
      <section  className={burgerIngredientsStyles['ingredient-section-wrapper']} ref={sectionRef}>
        {sections.map((item, i) => {


          const sectionProps = {
            title: item[0],
            type: item[1],
            ingredientsData: item[2],
            sectionRef,
            scrollRef
          };

          return <IngredientSection {...sectionProps} key={i} />  
        })}
      </section>
    );
  }, [ingredientsData]);

  useLayoutEffect(() => {
    let constructorState = sessionStorage.getItem('constructorState');
    
    if(!!constructorState) {
      constructorState = JSON.parse(constructorState);
      dispatch(selectedIngredientsSlice.actions.setFromState(constructorState));
    }

  }, [dispatch]);

  return (
    <section className={burgerIngredientsStyles.section}>
      {ingredientDetails}
        <TabOptions scrollRef={scrollRef} />
      {ingredientSections}
    </section>
  );
}

export default BurgerIngredients;

