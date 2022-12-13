import { useHistory } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.js";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  const history = useHistory();

  const SignOutHandler = () => {
    signOut(auth)
      .then(() => {
        history.replace("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Retail Management</div>
      <nav>
        <button onClick={SignOutHandler}>Sign Out</button>
      </nav>
    </header>
  );
}

export default MainNavigation;
