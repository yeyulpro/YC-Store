import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  loginSchema,
  type LoginSchemaType,
} from "../../lib/schema/loginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "./accounApi";
import { toast } from "react-toastify";
// import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
export default function LoginForm() {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });
  const onSubmit = async (data: LoginSchemaType) => {
    try {
      await login(data).unwrap();
      navigate(location.state?.from || "/catalog");
    } catch (error) {
      // const err = error as FetchBaseQueryError;
      const err = error as { data: { title?: string } };
      console.error("Login failed:", err?.data?.title);
      toast.error(`Login failed ${err?.data?.title}`, { position: "top-center" });
    }
  };

  return (
    <Container component={Paper} maxWidth="sm" sx={{ borderRadius: 3 }}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        marginTop="8"
      >
        <VpnKeyIcon />
        <Typography variant="h5" color="initial">
          Sign In
        </Typography>
        <Box
          component="form"
          width="100%"
          display="flex"
          flexDirection="column"
          gap={3}
          marginY={3}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            fullWidth
            autoFocus
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            autoFocus
            label="Password"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button disabled={isLoading} variant="contained" type="submit">
            Sign In
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Don't you have an account?
            <Typography
              component={Link}
              to={"/account/register"}
              sx={{ textDecoration: "none", ml: 2 }}
            >
              Sign Up
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
