import { HttpClientUtil } from "@http-client";
import { useLocale } from "@locale";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { IARepo } from "modules/IA/service/repo";
import { enqueueSnackbar } from "notistack";

import { useState } from "react";
interface props {
  
  id:number;
  open: boolean;
  onClose: () => void;
  getSlots: ()=>Promise<void>;
  
}

const SlotDeleteDialog: React.FC<props> = ({id, open, onClose, getSlots }) => {
 
  const { formatMessage } = useLocale();

  function closeDialog(e: React.SyntheticEvent, reason: string) {
    if (reason == "backdropClick" || reason === "escapeKeyDown") return;

    onClose();
  }

  const handleDeleteSlot = async():Promise<void> => {

        console.log(id);

        try {

            await IARepo.deletePpSlot(id);
            enqueueSnackbar(formatMessage("PP_Slot_Delete_Success"), {
              variant: "success",
            });
            // window.location.reload();
            getSlots();
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
          {formatMessage("Adhoc_PP_booking_form_dialog_title")}
        </DialogTitle>
        <DialogContent>
          <Typography color="black">
            {formatMessage("Delete_Confirmation")}
          </Typography>
        </DialogContent>
        <DialogActions className="mx-4 mb-3">
          <Button variant="contained" onClick={handleDeleteSlot}>
            {formatMessage("Delte_Slot")}
          </Button>
          <Button variant="outlined" onClick={onClose}>
            {formatMessage("cancel")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SlotDeleteDialog;
