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
import { IARepo } from "modules/IA/service/repo";
import { studentRepo } from "modules/student/service/repo";
import { useSnackbar } from "notistack";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  ppID: number;
  refetch: () => void;
}

const PPCancelDialog: React.FC<Props> = ({ open, onClose, ppID, refetch }) => {
  const { formatMessage } = useLocale();
  const { enqueueSnackbar } = useSnackbar();
  const [cancelReason, setCencelReason] = useState("");

  async function handleSubmit() {
    try {
      await IARepo.cancelPP(ppID, cancelReason.trim());
      setCencelReason("");
      enqueueSnackbar(formatMessage("pp_cancelled_submited_msg"), {
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
        {formatMessage("PP_cancel_dialog_title")}
      </DialogTitle>
      <DialogContent>
        <TextField
          value={cancelReason}
          onChange={(e) => setCencelReason(e.target.value)}
          multiline
          maxRows={4}
          placeholder={formatMessage("PP_cencel_placeholder")}
          fullWidth
          inputProps={{ minLength: 5 }}
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

export default PPCancelDialog;
