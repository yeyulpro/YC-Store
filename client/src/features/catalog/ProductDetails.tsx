import { useParams } from "react-router-dom";

import {
  Button,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useFetchProductDetailsQuery } from "./catalogApi";
import {
  useAddBasketItemMutation,
  useFetchBasketQuery,
  useRemoveBasketItemMutation,
} from "../basket/BasketApi";
import { useEffect, useState, type ChangeEvent } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const [removeBasketItem] = useRemoveBasketItemMutation();
  const [addBasketItem] = useAddBasketItemMutation();
  const { data: basket } = useFetchBasketQuery();
  const item = basket?.items.find((x) => x.productId === Number(id!));

  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
  }, [item]);

  const { data: product, isLoading } = useFetchProductDetailsQuery(
    id ? +id : 0
  );

  if (isLoading || !product) return <Typography>Loading...</Typography>;

  const handleUpdateBasket = () => {
    const updatedQuantity = item
      ? Math.abs(quantity - item.quantity)
      : quantity;
    if (!item || quantity > item.quantity) {
      addBasketItem({ product, quantity: updatedQuantity });
    } else {
      removeBasketItem({ productId: product.id, quantity: updatedQuantity });
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = +event.currentTarget.value;
    if (value > 0) setQuantity(value);
  };

  const productDetails = [
    { label: "Name", value: product?.name },
    { label: "Description", value: product?.description },
    { label: "Type", value: product?.type },
    { label: "Brand", value: product?.brand },
    { label: "Quantity in stock", value: product?.quantityInStock },
  ];

  return (
    <Grid container spacing={3}>
      <Grid size={6}>
        <img
          src={product?.pictureUrl}
          alt={product?.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid size={6}>
        <Typography variant="h3" color="initial">
          {product?.name}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {product && (
          <Typography variant="h6">
            ${(product.price / 100).toFixed(2)}
          </Typography>
        )}

        <TableContainer>
          <Table>
            <TableBody>
              {productDetails.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {detail.label}
                  </TableCell>
                  <TableCell sx={{ pl: 5 }}>{detail.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2} marginTop={3}>
          <Grid size={6}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in basket"
              fullWidth
              value={quantity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid size={6}>
            <Button
              onClick={handleUpdateBasket}
              disabled={
                quantity === item?.quantity || (!item && quantity === 0)
              }
              color="primary"
              size="large"
              variant="contained"
              fullWidth
              sx={{ height: 53 }}
            >
              {item ? "Update quantity" : "Add to basket"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
