import { ChevronLeft } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import studentApi from "../../../api/studentApi";
import { Student } from "../../../models";

interface Props {}

const AddEditPage = (props: Props) => {
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = Boolean(studentId);
  const [student, setStudent] = useState<Student>();
  useEffect(() => {
    if (!studentId) return;
    (async () => {
      try {
        const data: Student = await studentApi.getById(studentId);
        setStudent(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  console.log(student);
  return (
    <Box>
      <Link to="/admin/students">
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <ChevronLeft /> Back to student list
        </Typography>
      </Link>
      <Typography variant="h4">
        {isEdit ? "Update student info" : "Add new student"}
      </Typography>
    </Box>
  );
};

export default AddEditPage;
