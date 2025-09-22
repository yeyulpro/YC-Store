import { Box, Grid, Paper, Typography } from "@mui/material";
import type { Item } from "../../app/models/basket";
import { IconButton } from "@mui/material";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";

import {
  useAddBasketItemMutation,
  useRemoveBasketItemMutation,
} from "./BasketApi";
import { currencyFormat } from "../../lib/util";
type Props = {
  item: Item;
};

export default function BasketItemPage({ item }: Props) {
  const [removeBasketItem, { isLoading }] = useRemoveBasketItemMutation();
  const [addBasketItem] = useAddBasketItemMutation();
  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <Paper
      sx={{
        height: 150,
        borderRadius: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
      elevation={3}
    >
      <Box sx={{ display: "flex", gap: 1 }}>
        <Box
          component="img"
          src={item.pictureUrl}
          alt={item.name}
          sx={{
            width: 100,
            height: 100,
            objectFit: "cover",
            borderRadius: "4px",
            mr: 8,
            ml: 4,
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "start",
          }}
        >
          <Typography sx={{ fontSize: "1.3rem" }}>{item.name}</Typography>

          <Box sx={{ display: "flex" }}>
            <Typography sx={{ fontSize: "1.2rem", mr: 3 }} color="initial">
              {currencyFormat(item.price)} x {item.quantity}
            </Typography>

            <Typography
              sx={{ fontSize: "1.2rem", color: "#2e7d32", fontWeight: "bold" }}
              color="initial"
            >
              {currencyFormat(item.price * item.quantity)}
            </Typography>
          </Box>
          <Grid
            container
            sx={{ display: "flex", gap: 2, alignItems: "center" }}
          >
            <IconButton
              onClick={() =>
              removeBasketItem({ productId: item.productId, quantity: 1 })
              }
              color="error"
            >
              <IndeterminateCheckBoxIcon sx={{ color: "red" }} />
            </IconButton>
            <Typography variant="h6" color="initial">
            {item.quantity}
            </Typography>
            <IconButton
              onClick={() => addBasketItem({ product: item, quantity: 1 })}
            >
              <AddBoxIcon sx={{ color: "#1976d2" }} />
            </IconButton>
          </Grid>
        </Box>
      </Box>

      <IconButton
        color="error"
        sx={{ display: "flex", alignSelf: "start" }}
        onClick={() =>
        removeBasketItem({
            productId: item.productId,
            quantity: item.quantity,
          })
        }
      >
        <DisabledByDefaultOutlinedIcon />
      </IconButton>
    </Paper>
  );
}
