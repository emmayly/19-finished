import { useState, useEffect } from "react";
import { auth, storage, db } from "../firebase";
import { ref as Ref, push} from "firebase/database";
import { ref , uploadBytesResumable, getDownloadURL, getStorage,deleteObject } from "firebase/storage";

import ProductList from "../components/products/ProductList";
import Backdrop from "../components/layout/Backdrop";
import NewProductForm from "../components/products/NewProductForm";
import classes from "./AllProduct.module.css";

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

  function DeleteProduct(productId, imageURLRef) {
    const storage = getStorage();
    const desertRef = ref(storage, imageURLRef);

    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });

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

  function updateForm(
    productData,
    productId,
    updateMethod,
    acceptedFile,
    imageURLRef
  ) {
    var tempId = productId;
    if (productId === "") {
      const postsRef = Ref(db, "products");
      tempId = push(postsRef).key;
    }

    if (acceptedFile) {
      const file = acceptedFile[0];
      const storageRef = ref(storage, `/files/${tempId}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      setIsLoading(true);
      // upload image to firebase storage
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          if (snapshot.bytesTransferred === snapshot.totalBytes) {
          }
        },
        (error) => {
          console.warn(error);
        },
        () => {
          // then get the URL for the image
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              imageURLRef.current = downloadURL;
            })
            .then(() => {
              // then add the URL to firebase database
              auth.currentUser
                .getIdToken(true)
                .then((idToken) => {
                  console.log(imageURLRef.current);
                  fetch(
                    `https://retail-management-ccd0b-default-rtdb.firebaseio.com//products/${productId}.json?auth=${idToken}`,
                    {
                      method: updateMethod,
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        ...productData,
                        image: imageURLRef.current,
                      }),
                    }
                  );
                })
                .then(() => {
                  setReload(!reload);
                });
            });
        }
      );
    }
    else {
      auth.currentUser
        .getIdToken(true)
        .then((idToken) => {
          console.log(imageURLRef.current);
          fetch(
            `https://retail-management-ccd0b-default-rtdb.firebaseio.com//products/${productId}.json?auth=${idToken}`,
            {
              method: updateMethod,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...productData,
                image: imageURLRef.current,
              }),
            }
          );
        })
        .then(() => {
          setReload(!reload);
        });
    }
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
      <div className={classes.title}>
        <h1>Available Products</h1>
        <button onClick={showAddNewHandler} className={classes.addButton}>
          +
        </button>
      </div>
      <div>
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
