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

export default function ProductDetails() {
  const { id } = useParams();

  const { data: product, isLoading } = useFetchProductDetailsQuery(Number(id));
  if (isLoading || !product) return <Typography>Loading...</Typography>;
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
        <Typography variant="h6" color="initial">
          {product && (
            <Typography variant="h6">
              ${(product.price / 100).toFixed(2)}
            </Typography>
          )}
        </Typography>
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
              defaultValue={1}
            />
          </Grid>
          <Grid size={6}>
            <Button
              color="primary"
              size="large"
              variant="contained"
              fullWidth
              sx={{ height: 53 }}
            >
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
