import { HttpClientUtil } from "@http-client";
import { useLocale } from "@locale";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { LeaveTask } from "modules/IA/dto/task.dto";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (task: LeaveTask) => void;
}

const AddTaskDialog: React.FC<Props> = ({ open, onClose, onAdd }) => {
  const { formatMessage } = useLocale();
  const [assignedTo, setAssignedTo] = useState("");
  const [details, setDetails] = useState("");

  function handleSubmit() {
    onAdd({ assignedTo, details });
    onClose();
    setAssignedTo("");
    setDetails("");
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle variant="h2" color="primary">
        {formatMessage("add_task_dialog_title")}
      </DialogTitle>
      <DialogContent>
        <TextField
          size="small"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          placeholder={formatMessage("assigned_to_placeholder")}
          fullWidth
          inputProps={{ minLength: 2 }}
          required
        />
        <TextField
          size="small"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          multiline
          minRows={3}
          maxRows={4}
          placeholder={formatMessage("task_details_placeholder")}
          fullWidth
          inputProps={{ minLength: 2 }}
          className="mt-4"
          required
        />
      </DialogContent>
      <DialogActions className="p-4">
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!assignedTo.length || !details.length}
        >
          {formatMessage("add")}
        </Button>
        <Button variant="outlined" onClick={onClose}>
          {formatMessage("cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskDialog;
