import { Route, Routes, useNavigate } from "react-router-dom";
import DashboardPage from "./pages/dashboard.page";
import { Box, Button, Menu, MenuItem, Badge } from "@mui/material";
import { useLocale } from "@locale";
import { routes } from "routes/routes";
import PairProgramming from "./pages/pp.page";
import { useEffect, useRef, useState } from "react";
import CreateUser from "./pages/create-user.page";
import ManageRolePage from "./pages/manageRole.page";
import ManageLeaves from "./pages/manage-leaves";
import UploadSheetDialog from "./components/upload-sheet-dialog";
import { AdminRepo } from "./service/repo";
import { AdminLeaveTabs } from "./enum/leave-tab.enum";

export function ManageProfileMenu() {
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
        {formatMessage("manage_profiles")}
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
        <MenuItem onClick={() => navigate(routes.admin.createProfile)}>
          {formatMessage("create_user")}
        </MenuItem>
        <MenuItem onClick={() => navigate(routes.admin.manageRole)}>
          {formatMessage("manage_role")}
        </MenuItem>
      </Menu>
    </div>
  );
}

const AdminRoutes = () => {
  const { formatMessage } = useLocale();
  const navigate = useNavigate();
  const [uploadSheetDialog, serUploadSheetDialog] = useState(false);
  const [pendingLeaves, setPendingLeaves] = useState<number>(0);

  useEffect(() => {
    async function getLeaveData() {
      try {
        const data = await AdminRepo.getLeaves(AdminLeaveTabs.Pending);
        setPendingLeaves(data.total || 0);
      } catch (error) {}
    }

    getLeaveData();
  }, []);

  return (
    <>
      <Box className="flex flex-wrap justify-end gap-4">
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => serUploadSheetDialog(true)}
        >
          {formatMessage("upload_sheets")}
        </Button>
        <ManageProfileMenu />

        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => navigate(routes.admin.pairProgramming)}
        >
          {formatMessage("pair_programming")}
        </Button>
        <Badge badgeContent={pendingLeaves} color="primary">
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={() => navigate(routes.admin.leave)}
          >
            {formatMessage("leave")}
          </Button>
        </Badge>

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
        <Route index Component={DashboardPage} />
        <Route path="/pp" Component={PairProgramming} />
        <Route path="/createProfile" Component={CreateUser} />
        <Route path="/manageRole" Component={ManageRolePage} />
        <Route path="/leave" Component={ManageLeaves} />
      </Routes>
      <UploadSheetDialog open={uploadSheetDialog} onClose={() => serUploadSheetDialog(false)} />
    </>
  );
};

export default AdminRoutes;
