import AppHeader from "components/app-header/app-header";
import AppMain from "components/app-main/app-main";
import ErrorNotice from "components/error-notice/error-notice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "store/ingredients/ingredients-slice";

const App = () => {
  const dispatch = useDispatch();
  const { ingredientsLoad, ingredientsError } = useSelector(store => store.ingredients);


  useEffect(() => {
    const abortController = new AbortController();
    const abortSignal = abortController.signal;
    
    dispatch(getIngredients(abortSignal));
    
    return () => {
      abortController.abort();
    }
    
  }, [dispatch]);


  let appMain = <></>

  if(!ingredientsLoad) {
    appMain = ingredientsError ? <ErrorNotice /> : <AppMain/>;
  }

  return (
    <>
      <AppHeader />
      {appMain}
    </>
  );
}

export default App;