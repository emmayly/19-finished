import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.js";

import classes from "./MainNavigation.module.css";
import FavoritesContext from "../../store/favorites-context";

function MainNavigation() {
  const favoritesCtx = useContext(FavoritesContext);
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
          <li>
            <Link to="/favorites">
              My Favorites
              <span className={classes.badge}>
                {favoritesCtx.totalFavorites}
              </span>
            </Link>
          </li>
        </ul>
        <button onClick={SignOutHandler}>Sign Out</button>
      </nav>
    </header>
  );
}

export default MainNavigation;
