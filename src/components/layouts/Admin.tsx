import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectAuthSlice } from "../../features/auth/authSlice";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";

interface Props {}

export const Admin = (props: Props) => {
  const navigate = useNavigate();

  const { isNavigate } = useAppSelector(selectAuthSlice);

  useEffect(() => {
    if (!isNavigate) navigate("/login");
  }, [isNavigate, navigate]);
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid
          item
          xs={2}
          sx={{ borderRight: "1px solid #ccc", minHeight: "95vh" }}
        >
          <Box sx={{ height: "100%" }}>
            <Sidebar />
          </Box>
        </Grid>
        <Grid item xs={10}>
          <Box sx={{ height: "100%", margin: "8px 16px" }}>
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
