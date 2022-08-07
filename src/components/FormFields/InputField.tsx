import { TextField } from "@mui/material";
import { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";
import { Student } from "../../models";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
}

const InputField = ({ name, control, label, ...inputProps }: Props) => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <TextField
      size="small"
      value={value}
      error={invalid}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      fullWidth
      margin="normal"
      label={label}
      variant="outlined"
      helperText={error?.message}
      inputProps={inputProps}
    />
  );
};

export default InputField;
