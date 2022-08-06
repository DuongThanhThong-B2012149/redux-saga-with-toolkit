import {
  Box,
  Button,
  LinearProgress,
  Pagination,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectCityMap } from "../../city/citySlice";
import StudentTable from "../components/StudentTable";
import { selectStudentSlice, studentActions } from "../studentSlice";

interface Props {}

const ListPage = (props: Props) => {
  const dispatch = useAppDispatch();
  const { list, pagination, filter, loading } =
    useAppSelector(selectStudentSlice);
  const cityMap = useAppSelector(selectCityMap);
  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);

  const handlePageChange = (e: any, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      {loading && (
        <LinearProgress
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "-8px",
          }}
        />
      )}
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
      <StudentTable studentList={list} cityMap={cityMap} />
      {/* Pagination */}
      <Box
        mt={2}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          color="primary"
          count={Math.ceil(pagination._totalRows / pagination._limit)}
          page={pagination._page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Box>
  );
};

export default ListPage;
