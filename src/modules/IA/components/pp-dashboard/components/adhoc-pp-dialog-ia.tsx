import { useLocale } from '@locale';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'

import {useState} from "react";

interface props {
    open : boolean;
    onClose: () => void;
    addFeedback : (adhocId: number, feedback: string) => void
    adhocId : number
}

const AdhocPPDialogForIa:React.FC<props> = ({ open, onClose, addFeedback, adhocId }) => {


  const [description, setDescription] = useState<string>("");
  const { formatMessage } = useLocale();


  return (
    <Dialog open={open} fullWidth maxWidth={"sm"}>
    <DialogTitle variant="h2" color="primary">
      {formatMessage("How did the session went?")}
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
      <Button variant="contained" onClick={()=>{
        addFeedback(adhocId, description)
        onClose()
      }}>
        {formatMessage("submit")}
      </Button>
      <Button variant="outlined" onClick={onClose}>
        {formatMessage("cancel")}
      </Button>
    </DialogActions>
  </Dialog>
  )
}

export default AdhocPPDialogForIa;