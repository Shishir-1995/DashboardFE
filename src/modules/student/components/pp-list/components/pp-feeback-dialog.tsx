import { HttpClientUtil } from "@http-client";
import { useLocale } from "@locale";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";
import { studentRepo } from "modules/student/service/repo";
import { useSnackbar } from "notistack";
import { useState } from "react";
import StarIcon from "@mui/icons-material/Star";

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
  const [rating, setRating] = useState(1);

  async function handleSubmit() {
    try {
      await studentRepo.submitFeedback(ppID, `${rating} | ${feedback.trim()}`);
      setFeedBack("");
      enqueueSnackbar(formatMessage("pp_feedback_submited_msg"), {
        variant: "success",
      });
      onClose();
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
        {new Array(5).fill(1).map((_star, index) => (
          <IconButton
            key={`star-${index}`}
            onClick={() => setRating(index + 1)}
            color={index < rating ? "warning" : "default"}
          >
            <StarIcon />
          </IconButton>
        ))}
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
      <DialogActions className="p-4">
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
