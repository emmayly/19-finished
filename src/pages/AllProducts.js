import { useState, useEffect } from "react";
import { auth } from "../firebase";

import ProductList from "../components/products/ProductList";

function AllProductsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [deleteProduct, setDeleteProduct] = useState(true);

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
  }, [deleteProduct]);

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
        setDeleteProduct(!deleteProduct);
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
      <ProductList products={loadedProducts} onDeleteProduct={DeleteProduct} />
    </section>
  );
}

export default AllProductsPage;
