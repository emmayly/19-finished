import { Link, useHistory } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.js";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  const history = useHistory();

  const SignOutHandler = () => {
    signOut(auth)
      .then(() => {
        history.replace("/retail-management");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Retail Management</div>
      <nav>
        <ul>
          <li>
            <Link to="/all-meetups">Product List</Link>
          </li>
          <li>
            <Link to="/new-meetup">Add New Item</Link>
          </li>
        </ul>
        <button onClick={SignOutHandler}>Sign Out</button>
      </nav>
    </header>
  );
}

export default MainNavigation;
