import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface Props {
  icon: React.ReactElement;
  label: string;
  value: string | number;
}

export const StatisticItem = ({ icon, label, value }: Props) => {
  return (
    <Paper
      sx={{
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "6px 12px",
        border: "1px solid #ccc",
      }}
    >
      <Box>{icon}</Box>
      <Box>
        <Typography variant="h5" align="right">
          {value}
        </Typography>
        <Typography variant="caption">{label}</Typography>
      </Box>
    </Paper>
  );
};
