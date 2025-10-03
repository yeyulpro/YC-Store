import {
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import React from "react";
import {
  useLogoutMutation,
  useUserInfoQuery,
} from "../../features/account/accounApi";

import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";

export default function UserMenu() {
  const [logout] = useLogoutMutation();

  const { data } = useUserInfoQuery();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        onClick={handleClick}
        sx={{ fontSize: "1.2rem", color: "#FFF" }}
      >
        {data?.email}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText sx={{ color: "#0d1a94ff", fontWeight: "bold" }}>
            My Profile
          </ListItemText>
        </MenuItem>
        <MenuItem
          component={Link}
          to="/orders"
          sx={{ color: "#333333", fontWeight: "bold" }}
        >
          <ListItemIcon>
            <ShoppingBasketIcon />
          </ListItemIcon>
          <ListItemText>My Order</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText sx={{ color: "#FF0000", fontWeight: "bold" }}>
            Logout
          </ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}
