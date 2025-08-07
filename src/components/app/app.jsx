import AppHeader from "components/app-header/app-header";
import AppMain from "components/app-main/app-main";
import { useMemo, useState } from "react";
import { getIngredientsDetails } from "services/ingredients-service";
import { fetchPendingOrder, parseOrder } from "services/orders-service";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const ingredients = useMemo(() => {
    setIsLoading(false);

    return parseOrder(
      getIngredientsDetails(),
      fetchPendingOrder()
    )
  }, []);

  return (
    <>
      <AppHeader />
      {!isLoading ? <AppMain ingredientsData={ingredients.ingredientsData}/> : <></>}
    </>
  );
}

export default App;