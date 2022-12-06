import classes from "./Counter.module.css";

function Counter(props) {
  return (
    <div className={classes.counter}>
          <button className={classes.counterButton} onClick={props.onMinus}>-</button>
          <p className={classes.counterContent}>{props.quantity}</p>
      <button className={classes.counterButton} onClick={props.onAdd}>+</button>
    </div>
  );
}

export default Counter;
