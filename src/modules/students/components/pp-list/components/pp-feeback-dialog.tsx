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
import { studentRepo } from "modules/students/service/repo";
import { useSnackbar } from "notistack";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  ppID: number;
  refetch: () => void;
}

const PPFeebackDialog: React.FC<Props> = ({ open, onClose, ppID, refetch }) => {
  const { formatMessage } = useLocale();
  const { enqueueSnackbar } = useSnackbar();
  const [feedback, setFeedBack] = useState("");

  async function handleSubmit() {
    try {
      await studentRepo.submitFeedback(ppID, feedback.trim());
      setFeedBack("");
      enqueueSnackbar("pp_cancel_sucessfull_msg", { variant: "success" });
      refetch();
    } catch (error) {
      const msg = HttpClientUtil.getErrorMsgKey(error);
      enqueueSnackbar(msg, { variant: "error" });
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle variant="h2" color="primary">
        {formatMessage("PP_feeback_dialog_title")}
      </DialogTitle>
      <DialogContent>
        <TextField
          value={feedback}
          onChange={(e) => setFeedBack(e.target.value)}
          multiline
          maxRows={4}
          placeholder={formatMessage("PP_feeback_placeholder")}
          fullWidth
          inputProps={{ minLength: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleSubmit}>
          {formatMessage("submit")}
        </Button>
        <Button variant="outlined" onClick={onClose}>
          {formatMessage("cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PPFeebackDialog;
