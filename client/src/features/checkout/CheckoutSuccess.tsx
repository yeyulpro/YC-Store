import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import type { Order } from "../../app/models/order";
import {
  currencyFormat,
  formatAddressString,
  formatPaymentString,
} from "../../lib/util";
import { format } from "date-fns";

export default function CheckoutSuccess() {
  const { state } = useLocation();
  const order = state.data as Order;

  if (!order) return <Typography>Problem accessing the order</Typography>;

  return (
    <Container maxWidth="md">
      <>
        <Typography variant="h4" gutterBottom fontWeight="bold" color="initial">
          Thanks for your fake order!!
        </Typography>
        <Typography variant="body1" gutterBottom color="textSecondary">
          Your order<strong>#{order.id}</strong> will never be processed as this
          is a fake shop.
        </Typography>

        <Paper
          elevation={1}
          sx={{
            p: 2,
            mb: 2,
            display: "flex",
            flexDirection: "coloumn",
            gap: 1.4,          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Typography variant="body2" color="textSecondary">
              Order date{" "}
            </Typography>
            <Typography variant="body2" color="textSecondary" fontWeight="bold">
              {format(new Date(order.orderDate), "MM/dd/yyyy")}
            </Typography>
          </Box>
          <Divider />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Typography variant="body2" color="textSecondary">
              Payment Method
            </Typography>
            <Typography variant="body2" color="textSecondary" fontWeight="bold">
              {formatPaymentString(order.paymentSummary)}
            </Typography>
          </Box>
          <Divider />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Typography variant="body2" color="textSecondary">
              Shipping Address
            </Typography>
            <Typography variant="body2" color="textSecondary" fontWeight="bold">
              {formatAddressString(order.shippingAddress)}
            </Typography>
          </Box>
          <Divider />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Typography variant="body2" color="textSecondary">
              Amount
            </Typography>
            <Typography variant="body2" color="textSecondary" fontWeight="bold">
              {currencyFormat(order.total)}
            </Typography>
          </Box>
        </Paper>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          gap={2}
        >
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/orders/${order.id}`}
          >
            View your order
          </Button>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/catalog"
          >
            Continue shopping
          </Button>
        </Box>
      </>
    </Container>
  );
}
