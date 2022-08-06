import { Search } from "@mui/icons-material";
import { FormControl, Grid, InputLabel, OutlinedInput } from "@mui/material";
import { Box } from "@mui/system";
import { ChangeEvent } from "react";
import { City, ListParams } from "../../../models";

interface Props {
  filter: ListParams;
  cityList: City[];
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

const StudentFilter = ({
  filter,
  cityList,
  onChange,
  onSearchChange,
}: Props) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;

    const newFilter = {
      ...filter,
      name_like: e.target.value,
    };
    onSearchChange(newFilter);
  };
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl size="small" fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="searchByName">Search By Name</InputLabel>
            <OutlinedInput
              onChange={handleSearchChange}
              id="searchByName"
              endAdornment={<Search />}
              label="Search By Name"
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentFilter;
