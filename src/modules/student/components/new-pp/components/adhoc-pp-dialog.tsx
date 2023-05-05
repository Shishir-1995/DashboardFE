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
import { CourseType } from "modules/common/enum/course-type.enum";
import { studentRepo } from "modules/student/service/repo";
import { enqueueSnackbar } from "notistack";
import postcss from "postcss";

import { useState } from "react";

interface props {
  open: boolean;
  onClose: () => void;
  courseType: CourseType;
}

const AdhocPPDialog: React.FC<props> = ({ open, onClose, courseType }) => {
  const [description, setDescription] = useState<String>("");
  const { formatMessage } = useLocale();

  function closeDialog(e: React.SyntheticEvent, reason: string) {
    if (reason == "backdropClick" || reason === "escapeKeyDown") return;

    onClose();
  }

  const handleAdhocSession = async (): Promise<void> => {
    try {
      await studentRepo.requestAdhoc({
        topic: description,
        courseType: courseType,
      });
      enqueueSnackbar(formatMessage("pp_book_successful"), {
        variant: "success",
      });
      window.location.reload();
    } catch (err) {
      const msg = HttpClientUtil.getErrorMsgKey(err);
      enqueueSnackbar(msg, { variant: "error" });
    }
  };

  return (
    <Dialog open={open} onClose={closeDialog} fullWidth maxWidth={"sm"}>
      <DialogTitle variant="h2" color="primary">
        {formatMessage("Adhoc_PP_booking_form_dialog_title")}
      </DialogTitle>
      <DialogContent>
        <TextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          maxRows={4}
          placeholder={formatMessage("Adhoc_PP_booking_form_placeholder")}
          fullWidth
          inputProps={{ minLength: 2 }}
        />
      </DialogContent>
      <DialogActions className="mx-4 mb-3">
        <Button variant="contained" onClick={handleAdhocSession}>
          {formatMessage("submit")}
        </Button>
        <Button variant="outlined" onClick={onClose}>
          {formatMessage("cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdhocPPDialog;
