import { CssBaseline, Container } from "@mui/material";

import NavBar from "./NavBar";

import React from "react";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: 14 }}>
        <Outlet />
      </Container>
    </React.Fragment>
  );
}

export default App;
