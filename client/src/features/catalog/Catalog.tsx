import { Typography } from "@mui/material";
import { useFetchProductsQuery } from "./catalogApi";
import ProductList from "./ProductList";

export default function Catalog() {
  const { data: products, isLoading } = useFetchProductsQuery();
  if (isLoading || !products) return <Typography>Loading...</Typography>;
  return (
    <>
      <ProductList products={products} />
    </>
  );
}
