import { Route, Routes, useNavigate } from "react-router-dom";
import AdminPage from "./admin.page";
import { Box, Button } from "@mui/material";
import { useLocale } from "@locale";
import { routes } from "routes/routes";
import PairProgramming from "./pages/pp.page";

const AdminRoutes = () => {
  const { formatMessage } = useLocale();
  const navigate = useNavigate();

  return (
    <>
      <Box className="flex flex-wrap justify-end gap-4">
        
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => navigate(routes.admin.uploadSheets)}
        >
          {formatMessage("upload_sheets")}
        </Button>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => navigate(routes.admin.createProfile)}
        >
          {formatMessage("create_profile")}
        </Button>
       
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => navigate(routes.admin.pairProgramming)}
        >
          {formatMessage("pair_programming")}
        </Button>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => navigate(routes.ia.leave)}
        >
          {formatMessage("leave")}
        </Button>

        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => navigate(routes.admin.root)}
        >
          {formatMessage("home")}
        </Button>
      </Box>
      <Routes>
        <Route index Component={AdminPage} />
        <Route path="/pp" Component={PairProgramming} />
      </Routes>
    </>
  );
};

export default AdminRoutes;
