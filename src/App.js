import { Route, Switch } from "react-router-dom";

import WelcomePage from "./pages/welcome";
import NewProductPage from "./pages/NewProduct";
import Layout from "./components/layout/Layout";
import AllProductsPage from "./pages/AllProducts";

function App() {
  return (
    <Switch>
      <Route path="/retail-management" exact>
        <WelcomePage />
      </Route>
      <Layout>
        <Route path="/all-products" exact>
          <AllProductsPage />
        </Route>
        <Route path="/new-product" exact>
          <NewProductPage />
        </Route>
      </Layout>
    </Switch>
  );
}

export default App;
