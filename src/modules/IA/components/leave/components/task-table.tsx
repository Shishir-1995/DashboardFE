import { useLocale } from "@locale";
import {
  Paper,
  IconButton,
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
import DeleteIcon from "@mui/icons-material/Delete";
import AddTaskDialog from "./add-task-dialog";
import { useState } from "react";
import { LeaveTask } from "modules/IA/dto/task.dto";

interface Props {
  tasks: LeaveTask[];
  updateTask: (tasks: LeaveTask[]) => void;
}

const TaskTable: React.FC<Props> = ({ tasks, updateTask }) => {
  const { formatMessage } = useLocale();
  const [addTaskDialog, setAddTaskDialog] = useState(false);

  function onAdd(task: LeaveTask) {
    updateTask([...tasks, task]);
  }

  function handleDelete(i: number) {
    tasks.splice(i, 1);
    updateTask([...tasks]);
  }

  function deleteAll() {
    updateTask([]);
  }

  return (
    <div>
      <InputLabel>{formatMessage("assignee-task")}</InputLabel>
      <CardContent className="border p-6 mt-2">
        <div className="flex gap-6 mb-6">
          <Button variant="contained" onClick={() => setAddTaskDialog(true)}>
            {formatMessage("Add")}
          </Button>
          <Button variant="contained" color="error" onClick={deleteAll}>
            {formatMessage("Remove All")}
          </Button>
        </div>

        <TableContainer component={Paper} className="overflow-x-auto">
          <Table sx={{ minWidth: 450 }}>
            <TableHead>
              <TableRow>
                <TableCell className="border">{formatMessage("assigned_to")}</TableCell>
                <TableCell className="border">{formatMessage("task_details")}</TableCell>
                <TableCell className="border">{formatMessage("action")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task, i) => (
                <TableRow key={i}>
                  <TableCell className="border">{task.assignedTo}</TableCell>
                  <TableCell className="border">{task.details}</TableCell>
                  <TableCell className="border">
                    <IconButton size="small" onClick={() => handleDelete(i)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <AddTaskDialog open={addTaskDialog} onClose={() => setAddTaskDialog(false)} onAdd={onAdd} />
    </div>
  );
};

export default TaskTable;
