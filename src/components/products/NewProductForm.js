import { useRef } from "react";

import Card from "../ui/Card";
import classes from "./NewProductForm.module.css";

function NewProductForm(props) {
  const nameInputRef = useRef();
  const imageInputRef = useRef();
  const purchasePriceInputRef = useRef();
  const salePriceInputRef = useRef();
  const quantityInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredPurchasePrice = purchasePriceInputRef.current.value;
    const enteredSalePrice = salePriceInputRef.current.value;
    const enteredQuantity = quantityInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const productData = {
      name: enteredName,
      image: enteredImage,
      purchasePrice: enteredPurchasePrice,
      salePrice: enteredSalePrice,
      quantity: enteredQuantity,
      description: enteredDescription,
    };

    props.onAddProduct(productData);
    props.onClose();
  }
  

  return (
    <Card>
      <form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="name">Product Name</label>
          <input type="text" required id="name" ref={nameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Product Image</label>
          <input type="url" required id="image" ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="purchasePrice">Purchase Price</label>
          <input
            type="text"
            required
            id="purchasePrice"
            ref={purchasePriceInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="salePrice">Sale Price</label>
          <input type="text" required id="salePrice" ref={salePriceInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            rows="5"
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.control}>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            required
            id="quantity"
            ref={quantityInputRef}
            min="0"
          />
        </div>
        <div className={classes.actions}>
          <button
            className={[classes.btn, classes.btn_alt].join(" ")}
            onClick={props.closeEditHandler}
          >
            Cancel
          </button>
          <button
            className={classes.btn}
            onClick={submitHandler}
          >
            Save
          </button>
        </div>
      </form>
    </Card>
  );
}

export default NewProductForm;
