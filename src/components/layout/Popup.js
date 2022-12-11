import classes from "./Popup.module.css";

function Popup(props) {
  return (
    <div className={classes.popup}>
      <p>{props.text}</p>
      <button
        className={[classes.btn, classes.btn_alt].join(" ")}
        onClick={props.onClose}
      >
        Cancel
      </button>
      <button
        className={classes.btn}
        onClick={() => {
          props.onDelete(props.productId, props.imageURLref);
          props.onClose();
        }}
      >
        Confirm
      </button>
    </div>
  );
}

export default Popup;
