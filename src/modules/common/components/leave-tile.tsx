import styled from "@emotion/styled";
import { useLocale } from "@locale";
import { Typography, Button } from "@mui/material";

import { LeaveData } from "../dto/leave.dto";

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
}

const LeaveTile: React.FC<Props> = ({ leave, children }) => {
  const { formatMessage } = useLocale();

  return (
    <StyleLeaveTile>
      <div className="flex flex-col gap-2">
        <Typography variant="h3" color="primary" className="capitalize">
          {formatMessage("Name")} :{" "}
          {leave.userEmail.split("@")[0].split(".").join(" ")}
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
        <Typography variant="h4">
          {formatMessage("reason")} : {leave.reason}
        </Typography>
      </div>
      <div>{children}</div>
    </StyleLeaveTile>
  );
};

export default LeaveTile;
