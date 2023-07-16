import { useLocale } from "@locale";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Typography,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  tasks: { assignedTo: string; details: string }[];
}

const TaskDialog: React.FC<Props> = ({ open, onClose, tasks }) => {
  const { formatMessage } = useLocale();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={"sm"}>
      <DialogTitle variant="h2" color="primary">
        {formatMessage("leave_task_dialog_title")}
      </DialogTitle>
      <DialogContent>
        {tasks.length ? (
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>IA Name</TableCell>
                  <TableCell align="right">Task</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((task, i) => (
                  <TableRow
                    key={`task-row-${i}`}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {task.assignedTo}
                    </TableCell>
                    <TableCell align="right">{task.details}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="h3" className="text-center">
            {formatMessage("self_assign")}
          </Typography>
        )}
      </DialogContent>
      <DialogActions className="mx-4 mb-3">
        <Button variant="outlined" onClick={onClose}>
          {formatMessage("okay")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;
