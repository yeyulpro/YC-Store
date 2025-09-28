import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserInfoQuery } from "../../features/account/accounApi";
import { Box, Typography } from "@mui/material";

export default function RequireAuth() {
  const { data: user, isLoading } = useUserInfoQuery();
  const location = useLocation();

  if (isLoading) return <Typography>Loading ...</Typography>;
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return (
    <Box>
      <Outlet />
    </Box>
  );
}
