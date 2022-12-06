import ProductItem from "./ProductItem";
import classes from "./ProductList.module.css";

function ProductList(props) {
  return (
    <ul className={classes.list}>
      {props.products.map((product) => (
        <ProductItem
          key={product.id}
          id={product.id}
          image={product.image}
          name={product.name}
          purchasePrice={product.purchasePrice}
          salePrice={product.salePrice}
          quantity={product.quantity}
          description={product.description}
          onDelete={props.onDeleteProduct}
          changeQuantity={props.changeQuantity}
        />
      ))}
    </ul>
  );
}

export default ProductList;
