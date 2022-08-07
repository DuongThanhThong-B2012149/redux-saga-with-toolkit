import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Control, useForm } from "react-hook-form";
import { useAppSelector } from "../../../app/hooks";
import InputField from "../../../components/FormFields/InputField";
import RadioGroupField from "../../../components/FormFields/RadioGroupField";
import SelectField from "../../../components/FormFields/SelectField";
import { Student } from "../../../models";
import { selectCityOption } from "../../city/citySlice";

interface Props {
  initialValues?: Student;
  onSubmit?: (formValues: Student) => void;
}

const StudentForm = ({ initialValues, onSubmit }: Props) => {
  const cityOption = useAppSelector(selectCityOption);
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

        <RadioGroupField
          name="gender"
          control={control as Control<any>}
          label="Gender"
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
        />

        <SelectField
          name="city"
          control={control as Control<any>}
          label="City"
          options={cityOption}
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
