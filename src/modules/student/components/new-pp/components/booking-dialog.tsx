import { useLocale } from "@locale";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

import { CourseType } from "modules/common/enum/course-type.enum";
import { studentRepo } from "modules/student/service/repo";
import { HttpClientUtil } from "@http-client";
import { useSnackbar } from "notistack";

interface Props {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
  slotDetails: { slotId: number; courseType: CourseType };
}

const BookingDialog: React.FC<Props> = ({ open, onClose, refetch, slotDetails }) => {
  const [description, setDescription] = useState("");
  const { formatMessage } = useLocale();
  const { enqueueSnackbar } = useSnackbar();

  function closeDialog(e: React.SyntheticEvent, reason: string) {
    if (reason == "backdropClick" || reason === "escapeKeyDown") return;

    onClose();
  }

  async function handleSubmit() {
    try {
      const res = await studentRepo.bookPP({
        batch: "FT-WEB-20",
        ...slotDetails,
        topic: description.trim(),
        type: "regular",
      });

      setDescription("");
      refetch();
      onClose();
      enqueueSnackbar(formatMessage("pp_book_successful"), { variant: "success" });
      window.location.reload();
    } catch (error) {
      const msg = HttpClientUtil.getErrorMsgKey(error);
      enqueueSnackbar(msg, { variant: "error" });
    }
  }

  return (
    <Dialog open={open} onClose={closeDialog} fullWidth maxWidth={"sm"}>
      <DialogTitle variant="h2" color="primary">
        {formatMessage("PP_booking_form_dialog_title")}
      </DialogTitle>
      <DialogContent>
        <TextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          maxRows={4}
          placeholder={formatMessage("PP_booking_form_placeholder")}
          fullWidth
          inputProps={{ minLength: 2 }}
        />
      </DialogContent>
      <DialogActions className="mx-4 mb-3">
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

export default BookingDialog;
