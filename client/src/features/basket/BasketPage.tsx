import { Grid, Typography } from "@mui/material";
import { useFetchBasketQuery } from "./BasketApi";
import BasketItem from "./BasketItemPage";
import OrderSummary from "../../app/shared/component/OrderSummary";

import BasketEmpty from "./BasketEmpty";

export default function BasketPage() {
  const { data, isLoading } = useFetchBasketQuery();
  if (isLoading) return <Typography>Loading...</Typography>;
  if (!data || data.items.length == 0) return <BasketEmpty />;
  return (
    <Grid container spacing={3}>
      <Grid size={8}>
        {data.items.map((item) => (
          <BasketItem key={item.productId} item={item} />
        ))}
      </Grid>
      <Grid size={4}>
        <OrderSummary />
      </Grid>
    </Grid>
  );
}
