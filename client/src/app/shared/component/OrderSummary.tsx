import {
  Box,
  Typography,
  Divider,
  Button,
  TextField,
  Paper,
} from "@mui/material";
import { currencyFormat } from "../../../lib/util";
import { useFetchBasketQuery } from "../../../features/basket/BasketApi";
import type { Item } from "../../models/basket";
import { Link } from "react-router-dom";

export default function OrderSummary() {
  const { data: basket } = useFetchBasketQuery();
  const subtotal =
    basket?.items.reduce(
      (sum: number, item: Item) => sum + item.quantity * item.price,
      0
    ) ?? 0;
  const deliveryFee = subtotal > 10000 ? 0 : 500;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      maxWidth="lg"
      mx="auto"
    >
      <Paper sx={{ mb: 2, p: 3, width: "100%", borderRadius: 3 }}>
        <Typography variant="h6" component="p" fontWeight="bold">
          Order summary
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: "italic" }}>
          Orders over $100 qualify for free delivery!
        </Typography>
        <Box mt={2}>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography color="textSecondary">Subtotal</Typography>
            <Typography>{currencyFormat(subtotal)}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography color="textSecondary">Discount</Typography>
            <Typography color="success">
              {/* TODO */}
              -$0.00
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography color="textSecondary">Delivery fee</Typography>
            <Typography>{currencyFormat(deliveryFee)}</Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography color="textSecondary">Total</Typography>
            <Typography>{currencyFormat(subtotal + deliveryFee)}</Typography>
          </Box>
        </Box>

        <Box mt={2}>
          <Button
            component={Link}
            to={"/checkout"}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mb: 1 }}
          >
            Checkout
          </Button>
          <Button component={Link} to={"/catalog"} fullWidth>
            Continue Shopping
          </Button>
        </Box>
      </Paper>

      {/* Coupon Code Section */}
      <Paper sx={{ width: "100%", borderRadius: 3, p: 3 }}>
        <form>
          <Typography variant="subtitle1" component="label">
            Do you have a voucher code?
          </Typography>

          <TextField
            label="Voucher code"
            variant="outlined"
            fullWidth
            sx={{ my: 2 }}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Apply code
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
