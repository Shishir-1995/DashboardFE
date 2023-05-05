import { useTheme } from "@emotion/react";
import { AppBar, Avatar, Container, IconButton, Toolbar, Typography } from "@mui/material";
import { getCookie } from "utils/cookies/cookies";
import { useState, useEffect } from "react";
interface props {
  children: React.ReactNode;
}

const AppWrapper: React.FC<props> = ({ children }) => {
  const theme = useTheme();
  const [userName, setUserName] = useState<string | undefined>(getCookie("userName"));

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
    const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

    setUserName(capitalizedFirstName);
  };

  return (
    <div>
      <AppBar
        position="static"
        sx={{ boxShadow: theme.shadow.shadow_5, bgcolor: theme.palette.common.white }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters className="flex justify-between">
            <img src="https://masaischool.com/img/navbar/logo.svg" loading="lazy" />
            <div className="flex items-center gap-2">
              <Typography color="black">Hello, {userName}</Typography>
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
