import { useState, useEffect } from "react";
import { auth } from "../firebase";

import ProductList from "../components/products/ProductList";
import Backdrop from "../components/layout/Backdrop";
import NewProductForm from "../components/products/NewProductForm";

function AllProductsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [reload, setReload] = useState(true);
  const [addNew, setAddNew] = useState();
  function showAddNewHandler(productId) {
    setAddNew(true);
  }
  function closeAddNewHandler(productId) {
    setAddNew(false);
  }

  useEffect(() => {
    setIsLoading(true);
    auth.currentUser.getIdToken(true).then((idToken) => {
      fetch(
        `https://retail-management-ccd0b-default-rtdb.firebaseio.com//products.json?auth=${idToken}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const products = [];

          for (const key in data) {
            const product = {
              id: key,
              ...data[key],
            };

            products.push(product);
          }

          setIsLoading(false);
          setLoadedProducts(products);
        });
    });
  }, [reload]);

  function DeleteProduct(productId) {
    auth.currentUser
      .getIdToken(true)
      .then((idToken) => {
        fetch(
          `https://retail-management-ccd0b-default-rtdb.firebaseio.com//products/${productId}.json?auth=${idToken}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      })
      .then(() => {
        setReload(!reload);
      });
  }

  function changeQuantity(productId, quantity) {
    auth.currentUser
      .getIdToken(true)
      .then((idToken) => {
        fetch(
          `https://retail-management-ccd0b-default-rtdb.firebaseio.com//products/${productId}.json?auth=${idToken}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: `${quantity}` }),
          }
        );
      })
      .then(() => {
        setReload(!reload);
      });
  }

  function updateForm(productData, productId, updateMethod) {
      auth.currentUser
        .getIdToken(true)
        .then((idToken) => {
          fetch(
            `https://retail-management-ccd0b-default-rtdb.firebaseio.com//products/${productId}.json?auth=${idToken}`,
            {
              method: updateMethod,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(productData),
            }
          );
        })
        .then(() => {
          setReload(!reload);
        });
  }

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Available Products</h1>
      <div>
        <button onClick={showAddNewHandler}>
          Add New Item
        </button>
        {addNew && <Backdrop onClick={closeAddNewHandler} />}
        {addNew && (
          <NewProductForm
            onClose={closeAddNewHandler}
            method="POST"
            updateForm={updateForm}
            id=""
          />
        )}
      </div>
      <ProductList
        products={loadedProducts}
        onDeleteProduct={DeleteProduct}
        changeQuantity={changeQuantity}
        updateForm={updateForm}
      />
    </section>
  );
}

export default AllProductsPage;
