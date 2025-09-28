import { useForm } from "react-hook-form";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  registerSchema,
  type RegisterSchemaType,
} from "../../lib/schema/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useRegisterUserMutation } from "./accounApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export default function RegisterForm() {
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isLoading, isValid },
  } = useForm<RegisterSchemaType>({
    mode: "onTouched",
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    try {
      await registerUser(data).unwrap();
      toast.success("registeration succeed, Please log in.");
      navigate("/login");
    } catch (error) {
      const err = error as FetchBaseQueryError;
      if (err.status === 409) {
        setError("email", { message: "Already registered email" });
        toast.error("Already registered email.", { position: "top-center" });
      } else {
        toast.error("Failed in Registration", { position: "top-center" });
      }
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
        <PersonAddIcon />
        <Typography variant="h5" color="initial">
          Register
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
          <Button
            disabled={isLoading || !isValid}
            variant="contained"
            type="submit"
          >
            Sign Up
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?
            <Typography
              component={Link}
              to={"/login"}
              sx={{ textDecoration: "none", ml: 2 }}
            >
              Sign In Here
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
