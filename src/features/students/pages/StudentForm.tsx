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
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface Props {
  initialValues?: Student;
  onSubmit?: (formValues: Student) => void;
}

const schema = yup
  .object({
    name: yup
      .string()
      .required("Please enter your name.")
      .test("two-words", "please enter at least two words", (value) => {
        if (!value) return true;
        const parts = value.split(" ") || [];
        return parts.filter((x) => Boolean(x)).length >= 2;
      }),
    age: yup
      .number()
      .positive("Please enter positive number")
      .integer("Please enter integer number")
      .min(18, "Min is 18")
      .max(60, "Max is 60")
      .required("age is required")
      .typeError("Please enter a valid number"),
    mark: yup
      .number()
      .min(0, "Min is 0")
      .max(10, "Max is 10")
      .typeError("Please enter a valid number"),
    gender: yup
      .string()
      .oneOf(["male", "female"])
      .required("Gender is required"),
    city: yup.string().required("Please select city"),
  })
  .required();
const StudentForm = ({ initialValues, onSubmit }: Props) => {
  const cityOption = useAppSelector(selectCityOption);
  const { control, handleSubmit } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
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
