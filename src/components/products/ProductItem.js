import { useState } from "react";

import Popup from "../layout/Popup";
import Backdrop from "../layout/Backdrop";
import Card from "../ui/Card";
import Counter from "../Counter";
import NewProductForm from "./NewProductForm";
import classes from "./ProductItem.module.css";

function ProductItem(props) {
  const [showPopup, setShowPopup] = useState();
  const [onEdit, setOnEdit] = useState();
  function showPopupHandler(productId) {
    setShowPopup(true);
  }
  function closePopupHandler(productId) {
    setShowPopup(false);
  }
  function showEditHandler(productId) {
    setOnEdit(true);
  }
  function closeEditHandler(productId) {
    setOnEdit(false);
  }


  var currentQuantity = Number(props.quantity);

  function addOne() {
    if (currentQuantity >= 0) {
      currentQuantity += 1;
      props.changeQuantity(props.id, currentQuantity);
    }
  }
  function minusOne() {
    if (currentQuantity >= 1) {
      currentQuantity -= 1;
      props.changeQuantity(props.id, currentQuantity);
    }
  }

  return (
    <div>
      <li className={classes.item}>
        <Card>
          <div className={classes.image}>
            <img src={props.image} alt={props.name} />
          </div>
          <div className={classes.content}>
            <h3>Product Name: {props.name}</h3>
            <h3>Purchase Price: {props.purchasePrice}</h3>
            <h3>Sale Price: {props.salePrice}</h3>
            <p>Description: {props.description}</p>
            <p>Quantity:</p>
            <div className={classes.counter}>
              <Counter
                onAdd={addOne}
                onMinus={minusOne}
                quantity={currentQuantity}
              />
            </div>
          </div>
          <div className={classes.actions}>
            <button className={classes.edit} onClick={showEditHandler}>
              Edit
            </button>
            <button className={classes.delete} onClick={showPopupHandler}>
              Delete
            </button>
          </div>
        </Card>
      </li>
      {showPopup && <Backdrop onClick={closePopupHandler} />}
      {onEdit && <Backdrop onClick={closeEditHandler} />}
      {showPopup && (
        <Popup
          text="Are you sure?"
          onClose={closePopupHandler}
          onDelete={props.onDelete}
          productId={props.id}
          imageURLref={ props.image }
        />
      )}
      {onEdit && (
        <NewProductForm
          onClose={closeEditHandler}
          name={props.name}
          purchasePrice={props.purchasePrice}
          salePrice={props.salePrice}
          image={props.image}
          quantity={props.quantity}
          description={props.description}
          id={props.id}
          method="PUT"
          updateForm={props.updateForm}
        />
      )}
    </div>
  );
}

export default ProductItem;
