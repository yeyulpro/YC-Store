import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import DownhillSkiingSharpIcon from "@mui/icons-material/DownhillSkiingSharp";

export default function NavBar() {
  const leftLinks = [
    { title: "Catalog", path: "catalog" },
    { title: "About", path: "about" },
    { title: "Contact", path: "contact" },
  ];
  const rightLinks = [
    { title: "Login", path: "login" },
    { title: "Register", path: "register" },
  ];

  const navStyle = {
    typography: "h6",
    color: "#FFFF",
    "&:hover": { color: "#FFFF33", fontSize: "large" },
    "&.active": {
      color: "#FFFF33",
      fontWeight: "bold",
      fontSize: "1.6rem",
    },
  };

  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <DownhillSkiingSharpIcon sx={{ fontSize: "2rem" }} />
          <Typography
            variant="h6"
            component={NavLink}
            to="/"
            color={"inherit"}
            sx={{ textDecoration: "none" }}
          >
            YC-Store
          </Typography>
        </Box>

        <List sx={{ display: "flex" }}>
          {leftLinks.map(({ title, path }) => (
            <ListItem
              component={NavLink}
              to={path}
              key={path}
              color="inherit"
              sx={navStyle}
            >
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: "flex", gap: 2 }}>
          <IconButton>
            <Badge badgeContent={4} color="secondary">
              <ShoppingCartSharpIcon sx={{ color: "#FFFF" }} />
            </Badge>
          </IconButton>
          <List sx={{ display: "flex" }}>
            {rightLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyle}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
