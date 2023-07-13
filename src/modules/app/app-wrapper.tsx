import { useTheme } from "@emotion/react";
import {
  AppBar,
  Avatar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  MenuItem,
} from "@mui/material";
import { eraseCookie, getCookie } from "utils/cookies/cookies";
import { useState, useEffect } from "react";
import { useLocale } from "@locale";
import { useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import { IAProfileDto, StudentProfileDto } from "modules/auth/dto/login.dto";
import { commonRepo } from "modules/common/service/repo";
import { UserRole } from "modules/user/enum/user-role";

interface props {
  children: React.ReactNode;
}

const AppWrapper: React.FC<props> = ({ children }) => {
  const theme = useTheme();
  const [userName, setUserName] = useState<string | undefined>(
    getCookie("userName")
  );
  const [profileData, setProfileData] = useState<
    StudentProfileDto | IAProfileDto
  >();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    getName(userName ?? "user");
  }, []);

  function stringAvatar(name: string): string {
    return `${name.split(" ")[0][0].toUpperCase()}${
      name.split(" ").length > 1 ? name.split(" ")[1][0].toUpperCase() : ""
    }`;
  }

  const getName = (data: string): void => {
    let temp_userName = data;
    let firstName = temp_userName.split(" ")[0];
    const capitalizedFirstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1);

    setUserName(capitalizedFirstName);
  };

  async function integrateGoogle() {
    commonRepo.integrateGoogle();
  }

  async function integrateZoom() {
    commonRepo.integrateZoom();
  }

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          boxShadow: theme.shadow.shadow_5,
          bgcolor: theme.palette.common.white,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters className="flex justify-between">
            <img
              src="https://masaischool.com/img/navbar/logo.svg"
              loading="lazy"
            />

            <div className="flex items-center gap-2">
              <Typography color="black">Hello, {userName}</Typography>
              <IconButton
                size="small"
                color="primary"
                onClick={handleClick}
                aria-describedby={id}
              >
                <Avatar className="bg-gray-500">
                  {typeof userName === "string" && stringAvatar(userName)}
                </Avatar>
              </IconButton>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                color="info"
                sx={{ "& .MuiPopover-paper": { paddingY: "12px" } }}
              >
                <Typography
                  className="px-3"
                  fontWeight={"shadow_5"}
                  variant="h4"
                >
                  {getCookie("userName")}
                </Typography>
                <Typography
                  className="px-3 pb-3"
                  fontStyle={"italic"}
                  fontSize={"14px"}
                >
                  {getCookie("email")}
                </Typography>
                {getCookie("role") === UserRole.IA && (
                  <>
                    <MenuItem onClick={integrateGoogle}>
                      Integrate Google{" "}
                    </MenuItem>
                    <MenuItem onClick={integrateZoom}>Integrate Zoom </MenuItem>
                  </>
                )}
                <MenuItem
                  onClick={() => {
                    eraseCookie("role");
                    eraseCookie("userName");
                    eraseCookie("accessToken");
                    navigate("/auth/login");
                  }}
                >
                  Logout
                </MenuItem>
              </Popover>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <div className="m-6 pb-20">{children}</div>
    </div>
  );
};

export default AppWrapper;
