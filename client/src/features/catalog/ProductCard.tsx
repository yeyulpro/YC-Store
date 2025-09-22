import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import type { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { useAddBasketItemMutation } from "../basket/BasketApi";
type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const [AddBasketItem, { isLoading }] = useAddBasketItemMutation();
  

  return (
    <Card
      elevation={3}
      sx={{
        width: 200,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        title={product.name}
        image={product.pictureUrl}
        sx={{ height: 240, backgroundSize: "cover" }}
      />
      <CardContent>
        <Typography
          variant="subtitle2"
          sx={{ textTransform: "uppercase" }}
          gutterBottom
        >
          {product.name}
        </Typography>
        <Typography variant="h6" sx={{ color: "secondary.main" }} gutterBottom>
          ${(product.price / 100).toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-around" }}>
        <Button disabled={isLoading} onClick={() => AddBasketItem({ product:product, quantity: 1 })}>Add to Cart</Button>
        <Button component={Link} to={`/catalog/${product.id}`}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}
