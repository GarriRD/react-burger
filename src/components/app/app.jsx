import AppHeader from "components/app-header/app-header";
import AppMain from "components/app-main/app-main";
import Notice from "components/notice/notice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "services/actions/ingredients-slice";

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


  let appMain = <Notice type={'loading'} />

  if(!ingredientsLoad) {
    console.log('error', ingredientsError);
    appMain = ingredientsError ? <Notice type={'error'} /> : <AppMain/>;
  }

  return (
    <>
      <AppHeader />
      {appMain}
    </>
  );
}

export default App;