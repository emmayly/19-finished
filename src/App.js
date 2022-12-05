import { Route, Switch } from "react-router-dom";

import WelcomePage from "./pages/welcome";
import NewMeetupPage from "./pages/NewMeetup";
import Layout from "./components/layout/Layout";
import AllMeetupsPage from "./pages/AllMeetups";

function App() {
  return (
    <Switch>
      <Route path="/retail-management" exact>
        <WelcomePage />
      </Route>
      <Layout>
        <Route path="/all-meetups" exact>
          <AllMeetupsPage />
        </Route>
        <Route path="/new-meetup" exact>
          <NewMeetupPage />
        </Route>
      </Layout>
    </Switch>
  );
}

export default App;
