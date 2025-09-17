import { CssBaseline, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import type { Product } from "../models/type";
import Catalog from "../../features/catalog/Catalog";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch("https://localhost:5004/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: 14 }}>
        <Catalog products={products} />
      </Container>
    </React.Fragment>
  );
}

export default App;
