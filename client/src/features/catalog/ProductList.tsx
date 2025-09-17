import { Box } from "@mui/material";
import ProductCard from "./ProductCard";
import type { Product } from "../../app/models/type";

type Props = {
  products: Product[];
};

export default function ProductList({ products }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        justifyContent: "center",
      }}
    >
      {products.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </Box>
  );
}
