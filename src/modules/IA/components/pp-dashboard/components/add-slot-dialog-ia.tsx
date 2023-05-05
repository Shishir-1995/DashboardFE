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
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

interface props {
  open: boolean;
  date: string;
  onClose: () => void;
  getSlots: () => Promise<void>;
}

const AddSlotDialogIa: React.FC<props> = ({
  open,
  date,
  onClose,
  getSlots,
}) => {
  const [slotTime, setSlotTime] = useState<Dayjs | null>(dayjs('2022-04-17T15:30'));
  const { formatMessage } = useLocale();

  function closeDialog(e: React.SyntheticEvent, reason: string) {
    if (reason == "backdropClick" || reason === "escapeKeyDown") return;

    onClose();
  }

  const handleAddSlot = async (): Promise<void> => {
    
    try {
      if (typeof slotTime?.toISOString() === "string") {
        await IARepo.createSlot(slotTime.toISOString());
        enqueueSnackbar(formatMessage("PP_Slot_Add_Success"), {
          variant: "success",
        });

        getSlots();
        onClose();
      }
    } catch (err) {
      const msg = HttpClientUtil.getErrorMsgKey(err);
      enqueueSnackbar(msg, { variant: "error" });
    }
  };

  return (
    <>
      <Dialog open={open} onClose={closeDialog} fullWidth maxWidth={"sm"}>
        <DialogTitle variant="h2" color="primary">
        {formatMessage("ADD_Slots")}
        </DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              value={slotTime}
              defaultValue={slotTime}
              onChange={(slotTime) => setSlotTime(slotTime)}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions className="mx-4 mb-3">
          <Button variant="contained" onClick={()=>handleAddSlot()}>
            {formatMessage("Add_Slot")}
          </Button>
          <Button variant="outlined" onClick={onClose}>
            {formatMessage("cancel")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddSlotDialogIa;
