import { Box, Paper, Typography } from "@mui/material";

export default function BasketEmpty() {
  return (
    <Paper
      elevation={4}
      sx={{
        width: 1000,
        mx: "auto",
        alignContent: "center",
        p: 5,
        bgcolor: "#1E90FF",
        borderRadius: 3,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h2" sx={{ color: "#FFFF", fontWeight: "bold" }}>
          Your Basket is Empty...
        </Typography>
      </Box>
    </Paper>
  );
}
