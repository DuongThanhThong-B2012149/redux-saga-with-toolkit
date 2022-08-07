import {
  Box,
  Button,
  LinearProgress,
  Pagination,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import studentApi from "../../../api/studentApi";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ListParams, Student } from "../../../models";
import { selectCityMap, selectCitySlice } from "../../city/citySlice";
import StudentFilter from "../components/StudentFilter";
import StudentTable from "../components/StudentTable";
import { selectStudentSlice, studentActions } from "../studentSlice";

interface Props {}

const ListPage = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { list, pagination, filter, loading } =
    useAppSelector(selectStudentSlice);
  const cityMap = useAppSelector(selectCityMap);
  const { list: cityList } = useAppSelector(selectCitySlice);
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

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };

  const handleRemoveStudent = async (student: Student) => {
    try {
      // Remove student API
      await studentApi.remove(student.id || "");

      // Trigger to re-fetch student list with current filter
      dispatch(studentActions.setFilter({ ...filter }));
    } catch (error) {
      // Toast error
      console.log("Failed to fetch student", error);
    }
  };

  const handleClickEdit = (student: Student) => {
    navigate(`${student.id}`);
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
        <Link
          to="add"
          style={{
            textDecoration: "none",
          }}
        >
          <Button variant="contained" color="primary">
            Add new student
          </Button>
        </Link>
      </Box>
      <Box my={3}>
        <StudentFilter
          cityList={cityList}
          filter={filter}
          onSearchChange={handleSearchChange}
          onChange={handleFilterChange}
        />
      </Box>
      {/* StudentTable */}
      <StudentTable
        studentList={list}
        cityMap={cityMap}
        onRemove={handleRemoveStudent}
        onEdit={handleClickEdit}
      />
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
