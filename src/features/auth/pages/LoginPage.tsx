import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { authActions, selectAuthSlice } from "../authSlice";

interface Props {}

const LoginPage = (props: Props) => {
  const navigate = useNavigate();
  const { isNavigate, logging } = useAppSelector(selectAuthSlice);
  const dispatch = useAppDispatch();
  const handleLoginClick = async () => {
    dispatch(
      authActions.login({
        username: "",
        password: "",
      })
    );
  };

  useEffect(() => {
    if (isNavigate) navigate("/admin");
  }, [isNavigate, navigate]);

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          padding: "16px",
        }}
      >
        <Typography variant="h5" component="h1">
          Student Management
        </Typography>
        <Box mt={4}>
          {logging && <CircularProgress size={20} color="secondary" />}
          <Button
            onClick={handleLoginClick}
            fullWidth
            variant="contained"
            color="primary"
          >
            Fake Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default LoginPage;
