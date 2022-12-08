

import NewProductForm from "../components/products/NewProductForm";

function NewProductPage() {

  return (
    <section>
      <h1>Add New Product</h1>
      <NewProductForm method="POST"/>
    </section>
  );
}

export default NewProductPage;
