import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useLocale } from "@locale";
import PPList from ".";
import IASlots from "./components/slots";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Dashboard = () => {
  const { formatMessage } = useLocale();
  const [open, setOpen] = React.useState(false);
  const [toggleState, setToggleState] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleToggle = () => {
    setToggleState(!toggleState);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ marginBottom: "30px" }}>
        <Button color="primary" variant="contained" size="large" onClick={handleClickOpen}>
          {formatMessage("Show Slots")}
        </Button>
      </Box>
      <Box>
        <PPList handleToggle={handleToggle} />
      </Box>
      <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h2" className="text-center">
            {formatMessage("slots")}
          </Typography>
        </DialogTitle>
        <IASlots toggleState={toggleState} />
      </Dialog>
    </>
  );
};

export default Dashboard;
