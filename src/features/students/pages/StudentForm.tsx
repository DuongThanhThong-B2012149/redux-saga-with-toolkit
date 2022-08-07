import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Control, useForm } from "react-hook-form";
import InputField from "../../../components/FormFields/InputField";
import { Student } from "../../../models";

interface Props {
  initialValues?: Student;
  onSubmit?: (formValues: Student) => void;
}

const StudentForm = ({ initialValues, onSubmit }: Props) => {
  const { control, handleSubmit } = useForm<Student>({
    defaultValues: initialValues,
  });

  const handleFormSubmit = (formValues: Student) => {
    console.log("Submit: ", formValues);
  };
  return (
    <Box
      sx={{
        maxWidth: 400,
      }}
    >
      <form action="" onSubmit={handleSubmit(handleFormSubmit)}>
        {/* FORM FIELD */}
        <InputField
          name="name"
          control={control as Control<any>}
          label="Full Name"
        />
        <InputField
          name="age"
          control={control as Control<any>}
          label="Age"
          type="number"
        />
        <InputField
          name="mark"
          control={control as Control<any>}
          label="Mark"
          type="number"
        />

        <InputField
          name="gender"
          control={control as Control<any>}
          label="Gender"
        />
        <InputField
          name="city"
          control={control as Control<any>}
          label="City"
        />
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default StudentForm;
