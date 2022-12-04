import { Route, Switch } from "react-router-dom";

import WelcomePage from "./pages/welcome";
import NewMeetupPage from "./pages/NewMeetup";
import FavoritesPage from "./pages/Favorites";
import Layout from "./components/layout/Layout";
import AllMeetupsPage from "./pages/AllMeetups";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <WelcomePage />
      </Route>
      <Layout>
        <Route path="/all-meetups" exact>
          <AllMeetupsPage />
        </Route>
        <Route path="/new-meetup" exact>
          <NewMeetupPage />
        </Route>
        <Route path="/favorites" exact>
          <FavoritesPage />
        </Route>
      </Layout>
    </Switch>
  );
}

export default App;
