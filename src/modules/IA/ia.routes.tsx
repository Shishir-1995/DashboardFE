import { Route, Routes, useNavigate } from "react-router-dom";
import IAPage from "./ia.page";
import Dashboard from "./components/pp-dashboard/Dashboard";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useLocale } from "@locale";
import LeavePage from "./components/leave/leave.page";
import { routes } from "routes/routes";
import HomeDashboard from "./components/home/components/HomeDashboard";

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
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => navigate(routes.ia.leave)}
        >
          {formatMessage("Apply_Leave")}
        </Button>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => navigate("/ia/homedashboard")}
        >
          {formatMessage("home_dashboard")}
        </Button>
      </Box>

      <Routes>
        <Route index Component={IAPage} />
        <Route path="pp" element={<Dashboard />} />
        <Route path="leave" element={<LeavePage />} />
        <Route path="homedashboard" element={<HomeDashboard/>}/>
      </Routes>
    </>
  );
};

export default IARoutes;
