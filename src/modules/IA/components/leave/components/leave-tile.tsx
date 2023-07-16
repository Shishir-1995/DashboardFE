import styled from "@emotion/styled";
import { HttpClientUtil } from "@http-client";
import { useLocale } from "@locale";
import { Typography, Button, Chip } from "@mui/material";
import { LeaveData } from "modules/common/dto/leave.dto";

import { LeaveStatus } from "modules/common/enum/leave-status.enum";
import { useSnackbar } from "notistack";
import TaskDialog from "./task-dialog";
import { useState } from "react";
import { IARepo } from "modules/IA/service/repo";

const StyleLeaveTile = styled("div")(({ theme }) => ({
  padding: "8px 16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #eaeaeaca",
  boxShadow: theme.shadow.shadow_10,
  backgroundColor: theme.palette.common.white,

  "&:hover": {
    backgroundColor: theme.palette.background.default,
  },
}));

interface Props {
  leave: LeaveData;
  children?: React.ReactNode;
  refetch: () => void;
}

const LeaveTile: React.FC<Props> = ({ leave, children, refetch }) => {
  const { formatMessage } = useLocale();
  const { enqueueSnackbar } = useSnackbar();
  const [taskDialog, setTaskDialog] = useState(false);

  async function handleCancel() {
    try {
      await IARepo.cancelLeave(leave.id);
      refetch();
      enqueueSnackbar(formatMessage("leave_cancelled"), { variant: "success" });
    } catch (error) {
      const msg = HttpClientUtil.getErrorMsgKey(error);
      enqueueSnackbar(msg, { variant: "error" });
    }
  }

  return (
    <>
      <StyleLeaveTile>
        <div className="flex flex-col gap-2">
          <Typography variant="h4">
            {formatMessage("reason")} : {leave.reason}
          </Typography>
          <Typography variant="h4" className="italic">
            From:{" "}
            <span className="font-medium">
              {new Date(leave.startDate).toLocaleDateString("en-US", {
                dateStyle: "medium",
              })}{" "}
              (session start {leave.startSession})
            </span>
          </Typography>
          <Typography variant="h4" className="italic">
            To:{" "}
            <span className="font-medium">
              {new Date(leave.endDate).toLocaleDateString("en-US", {
                dateStyle: "medium",
              })}{" "}
              (session end {leave.startSession})
            </span>
          </Typography>
          <Button
            onClick={() => setTaskDialog(true)}
            variant="outlined"
            color="primary"
            fullWidth={false}
          >
            Handover Tasks
          </Button>
        </div>
        <Chip
          label={leave.status}
          color={
            leave.status === LeaveStatus.Approved
              ? "success"
              : leave.status === LeaveStatus.Rejected || leave.status === LeaveStatus.Cancelled
              ? "error"
              : "warning"
          }
        />
        {leave.status === LeaveStatus.Pending && (
          <Button variant="outlined" color="error" onClick={handleCancel}>
            Cancel
          </Button>
        )}
      </StyleLeaveTile>
      <TaskDialog
        tasks={leave.handoverTask}
        open={taskDialog}
        onClose={() => setTaskDialog(false)}
      />
    </>
  );
};

export default LeaveTile;
