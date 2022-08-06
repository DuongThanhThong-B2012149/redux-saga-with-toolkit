import { Box, Button, Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { City, Student } from "../../../models";
import { capitalizeString, getMarkColor } from "../../../utils";

interface Props {
  studentList: Student[];
  cityMap: {
    [key: string]: City;
  };
  onEdit?: (student: Student) => void;
  onRemove?: (student: Student) => void;
}

export default function StudentTable({
  studentList,
  cityMap,
  onEdit,
  onRemove,
}: Props) {
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Mark</TableCell>
            <TableCell>City</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList.map((student, idx) => (
            <TableRow key={student.id}>
              <TableCell>{student.id}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{capitalizeString(student.gender)}</TableCell>
              <TableCell>
                <Box color={getMarkColor(student.mark)}>{student.mark}</Box>
              </TableCell>
              <TableCell>{cityMap[student.city]?.name}</TableCell>
              <TableCell align="right">
                <Button
                  onClick={() => {
                    onEdit?.(student);
                  }}
                  variant="contained"
                  color="primary"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => {
                    onRemove?.(student);
                  }}
                  sx={{ ml: 2 }}
                  variant="outlined"
                  color="error"
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
