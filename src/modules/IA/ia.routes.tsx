import { Route, Routes, useNavigate } from "react-router-dom";
import IAPage from "./ia.page";
import Dashboard from "./components/pp-dashboard/Dashboard";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useLocale } from "@locale";

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
        <Button size="small" variant="contained" color="secondary">
          {formatMessage("Apply_Leave")}
        </Button>
      </Box>

      <Routes>
        <Route index Component={IAPage} />
        <Route path="pp" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default IARoutes;
