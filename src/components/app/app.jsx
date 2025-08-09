import AppHeader from "components/app-header/app-header";
import AppMain from "components/app-main/app-main";
import ErrorNotice from "components/error-notice/error-notice";
import { useEffect, useState } from "react";
import { getIngredientsDetails } from "services/ingredients-service";
import { fetchPendingOrder, parseOrder } from "services/orders-service";


const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState('success');
  const [ingredientsData, setIngredientsData] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const abortSignal = abortController.signal;

    const loadIngredientsData = async () => {

      const loadedIngredients = await getIngredientsDetails(abortSignal);
      
      const currentOrder = fetchPendingOrder();
      const parsedIngredients = parseOrder(loadedIngredients, currentOrder);
      
      setIngredientsData(parsedIngredients.ingredientsData);
      setIsLoading(false);
      setStatus(parsedIngredients.status);
    }
    
    loadIngredientsData();

    return () => {
      abortController.abort();
    }
    
  }, []);


  let appMain = <></>

  if(!isLoading) {
    appMain = status !== 'error' ? <AppMain ingredientsData={ingredientsData} /> : <ErrorNotice />;
  }
  
  return (
    <>
      <AppHeader />
      {appMain}
    </>
  );
}

export default App;