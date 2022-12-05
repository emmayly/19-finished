import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

import NewProductForm from "../components/products/NewProductForm";

function NewProductPage() {
  const history = useHistory();

  function addProductHandler(productData) {
    auth.currentUser
      .getIdToken(true)
      .then((idToken) => {
        fetch(
          `https://retail-management-ccd0b-default-rtdb.firebaseio.com//products.json?auth=${idToken}`,
          {
            method: "POST",
            body: JSON.stringify(productData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      })
      .then(() => {
        history.replace("/all-products");
      });
  }

  return (
    <section>
      <h1>Add New Product</h1>
      <NewProductForm onAddProduct={addProductHandler} />
    </section>
  );
}

export default NewProductPage;
