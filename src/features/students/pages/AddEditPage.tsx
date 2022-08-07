import { ChevronLeft } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import studentApi from "../../../api/studentApi";
import { Student } from "../../../models";
import StudentForm from "./StudentForm";

interface Props {}

const AddEditPage = (props: Props) => {
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = Boolean(studentId);
  const [student, setStudent] = useState<Student>();

  // Handle get data and check add or edit page
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
  }, [studentId]);

  // Handle Form
  const handleStudentFormSubmit = (formValues: Student) => {};

  const initialValues: Student = {
    name: "",
    age: "",
    mark: "",
    gender: "male",
    city: "",
    ...student,
  } as Student; // Ép kiểu để age với mark không bị lỗi kiểu number
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
      <Typography variant="h4" mt={2}>
        {isEdit ? "Update student info" : "Add new student"}
      </Typography>

      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm
            initialValues={initialValues}
            onSubmit={handleStudentFormSubmit}
          />
        </Box>
      )}
    </Box>
  );
};

export default AddEditPage;
