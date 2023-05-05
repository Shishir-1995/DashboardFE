import { useTheme } from "@emotion/react";
import {
  AppBar,
  Avatar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { getCookie } from "utils/cookies/cookies";
import { useState, useEffect } from "react";
import { useLocale } from "@locale";
import { useNavigate } from "react-router-dom";
interface props {
  children: React.ReactNode;
}

const AppWrapper: React.FC<props> = ({ children }) => {

  const theme = useTheme();
  const [userName, setUserName] = useState<string | boolean>(getCookie("user_name"));
  const { formatMessage } = useLocale();
  const navigate = useNavigate();

  function stringAvatar(name: string): string {
    return `${name.split(" ")[0][0].toUpperCase()}${
      name.split(" ").length > 1 ? name.split(" ")[1][0].toUpperCase() : ""
    }`;
  }

  const getName = (data: string | boolean): void => {
    if (typeof data === "boolean") {
      return;
    }

    let temp_userName = data;
    let firstName = temp_userName.split(" ")[0];
    const capitalizedFirstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1);

    setUserName(capitalizedFirstName);
  };

  useEffect(() => {
    getName(userName);
  }, []);

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
            <Button variant="contained" color="secondary" onClick={()=>navigate("/ia")}>
              {formatMessage("Student_Details")}
            </Button>
            <Button variant="contained" color="secondary" onClick={()=>navigate("/ia/pp")}>
              {formatMessage("PPdashboard")}
            </Button>
            <Button variant="contained" color="secondary">
              {formatMessage("Apply_Leave")}
            </Button>
            <div className="flex items-center gap-2">
              <Typography color="black">{userName}</Typography>
              <IconButton size="small" color="primary">
                <Avatar className="bg-gray-500">
                  {typeof userName === "string" && stringAvatar(userName)}
                </Avatar>
              </IconButton>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <div className="m-6 pb-20">{children}</div>
    </div>
  );
};

export default AppWrapper;
