import { useLocale } from "@locale";
import {
  Paper,
  InputLabel,
  CardContent,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

interface Props {
  tasks: [];
}

const TaskTable = () => {
  const { formatMessage } = useLocale();

  return (
    <div>
      <InputLabel>{formatMessage("assignee-task")}</InputLabel>
      <CardContent className="border p-6 mt-2">
        <div className="flex gap-6 mb-6">
          <Button variant="contained">{formatMessage("Add")}</Button>
          <Button variant="contained" color="error">
            {formatMessage("Remove All")}
          </Button>
        </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell className="border">{formatMessage("assigne_to")}</TableCell>
                <TableCell className="border">{formatMessage("task_details")}</TableCell>
                <TableCell className="border">{formatMessage("action")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </div>
  );
};

export default TaskTable;
