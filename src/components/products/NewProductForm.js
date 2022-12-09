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

    props.updateForm(productData,props.id,props.method);
    props.onClose();
  }


  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            defaultValue={props.name}
            required
            id="name"
            ref={nameInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Product Image</label>
          <input
            type="url"
            defaultValue={props.image}
            required
            id="image"
            ref={imageInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="purchasePrice">Purchase Price</label>
          <input
            type="text"
            required
            id="purchasePrice"
            defaultValue={props.purchasePrice}
            ref={purchasePriceInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="salePrice">Sale Price</label>
          <input
            type="text"
            required
            defaultValue={props.salePrice}
            id="salePrice"
            ref={salePriceInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            rows="5"
            defaultValue={props.description}
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.control}>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            required
            id="quantity"
            defaultValue={props.quantity}
            ref={quantityInputRef}
            min="0"
          />
        </div>
        <div className={classes.actions}>
          <button
            className={[classes.btn, classes.btn_alt].join(" ")}
            onClick={props.onClose}
          >
            Cancel
          </button>
          <button className={classes.btn}>Save</button>
        </div>
      </form>
    </Card>
  );
}

export default NewProductForm;
