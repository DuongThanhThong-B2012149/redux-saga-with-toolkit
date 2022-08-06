import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import StudentTable from "../components/StudentTable";
import { selectStudentSlice, studentActions } from "../studentSlice";

interface Props {}

const ListPage = (props: Props) => {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector(selectStudentSlice);
  useEffect(() => {
    dispatch(
      studentActions.fetchStudentList({
        _page: 1,
        _limit: 15,
      })
    );
  }, []);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Students</Typography>
        <Button variant="contained" color="primary">
          Add new student
        </Button>
      </Box>
      {/* StudentTable */}
      <StudentTable studentList={list} />
      {/* Pagination */}
    </Box>
  );
};

export default ListPage;
