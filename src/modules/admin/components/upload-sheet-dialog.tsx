import { HttpClientUtil } from "@http-client";
import { useLocale } from "@locale";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Link,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { AdminRepo } from "../service/repo";

interface props {
  open: boolean;
  onClose: () => void;
}

const UploadSheetDialog: React.FC<props> = ({ open, onClose }) => {
  const [url, setUrl] = useState<string>("");
  const { formatMessage } = useLocale();

  function closeDialog(e: React.SyntheticEvent, reason: string) {
    if (reason == "backdropClick" || reason === "escapeKeyDown") return;

    onClose();
  }

  const handleUploadSheet = async (): Promise<void> => {
    try {
      await AdminRepo.uploadSheet(url);
      enqueueSnackbar(formatMessage("sheet_uploaded_msg"), {
        variant: "success",
      });

      onClose();
    } catch (err) {
      const msg = HttpClientUtil.getErrorMsgKey(err);
      enqueueSnackbar(msg, { variant: "error" });
    }
  };

  return (
    <>
      <Dialog open={open} onClose={closeDialog} fullWidth maxWidth={"sm"}>
        <DialogTitle variant="h2" color="primary">
          {formatMessage("upload_sheet_dialog_title")}
        </DialogTitle>
        <DialogContent>
          <Link
            href="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
            target="_blank"
            download
          >
            <Button variant="contained">Download Tamplate</Button>
          </Link>

          <br />

          <TextField
            fullWidth
            type="url"
            onChange={(e) => setUrl(e.target.value.trim())}
            className="my-2"
            placeholder="share link to upload"
          />
        </DialogContent>
        <DialogActions className="mx-4 mb-3">
          <Button variant="contained" onClick={handleUploadSheet}>
            {formatMessage("upload sheet")}
          </Button>
          <Button variant="outlined" onClick={onClose}>
            {formatMessage("cancel")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UploadSheetDialog;
