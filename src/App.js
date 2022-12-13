import { Route, Switch } from "react-router-dom";

import WelcomePage from "./pages/welcome";
import Layout from "./components/layout/Layout";
import AllProductsPage from "./pages/AllProducts";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <WelcomePage />
      </Route>
      <Layout>
        <Route path="/all-products" exact>
          <AllProductsPage />
        </Route>
      </Layout>
    </Switch>
  );
}

export default App;
