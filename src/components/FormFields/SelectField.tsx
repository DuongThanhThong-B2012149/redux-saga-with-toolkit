import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Control, useController } from "react-hook-form";
interface SelectOption {
  label?: string;
  value: number | string;
}
interface Props {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: SelectOption[];
}

const SelectField = ({ name, control, label, disabled, options }: Props) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <FormControl
      fullWidth
      size="small"
      variant="standard"
      disabled={disabled}
      margin="normal"
      error={invalid}
    >
      <InputLabel id="sortBy">{label}</InputLabel>
      <Select
        labelId="sortBy"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
};

export default SelectField;
