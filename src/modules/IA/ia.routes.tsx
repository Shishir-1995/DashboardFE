import { Route, Routes, useNavigate } from "react-router-dom";
import IAPage from "./ia.page";
import Dashboard from "./components/pp-dashboard/Dashboard";
import { Button, MenuItem, Menu, Box } from "@mui/material";
import { useLocale } from "@locale";
import LeavePage from "./components/leave/leave.page";
import { routes } from "routes/routes";
import HomeDashboard from "./components/home/components/HomeDashboard";
import { useState } from "react";
import LeaveStatus from "./components/leave/leave-status";

export function LeaveMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { formatMessage } = useLocale();
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {formatMessage("Leave")}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => navigate(routes.ia.leave)}>
          {formatMessage("apply_leave")}
        </MenuItem>
        <MenuItem onClick={() => navigate(routes.ia.leaveView)}>
          {formatMessage("view_status")}
        </MenuItem>
      </Menu>
    </div>
  );
}

const IARoutes = () => {
  const navigate = useNavigate();
  const { formatMessage } = useLocale();

  return (
    <>
      <Box className="flex flex-wrap justify-end gap-4">
        <Button size="small" variant="contained" color="secondary" onClick={() => navigate("/ia")}>
          {formatMessage("Student_Details")}
        </Button>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => navigate("/ia/pp")}
        >
          {formatMessage("PPdashboard")}
        </Button>
        <LeaveMenu />
      </Box>

      <Routes>
        <Route index Component={IAPage} />
        <Route path="pp" element={<Dashboard />} />
        <Route path="leave" element={<LeavePage />} />
        <Route path="homedashboard" element={<HomeDashboard />} />
        <Route path="leave/view" element={<LeaveStatus />} />
      </Routes>
    </>
  );
};

export default IARoutes;
