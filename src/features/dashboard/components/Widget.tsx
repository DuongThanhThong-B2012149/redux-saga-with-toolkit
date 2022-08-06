import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface Props {
  title: string;
  children: any;
}

const Widget = ({ title, children }: Props) => {
  return (
    <Paper
      elevation={2}
      sx={{
        padding: "16px",
        border: "1px solid #ccc",
      }}
    >
      <Typography variant="button">{title}</Typography>
      <Box mt={2}>{children}</Box>
    </Paper>
  );
};

export default Widget;
