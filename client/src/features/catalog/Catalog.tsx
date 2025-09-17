import type { Product } from "../../app/models/type";
import ProductList from "./ProductList";
type Props = {
  products: Product[];
};

export default function Catalog({ products }: Props) {
  return (
    <>
      <ProductList products={products} />
    </>
  );
}
