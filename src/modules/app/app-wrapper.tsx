import { useTheme } from "@emotion/react";
import { AppBar, Avatar, Container, IconButton, Toolbar, Typography } from "@mui/material";

interface props {
  children: React.ReactNode;
}

const AppWrapper: React.FC<props> = ({ children }) => {
  const theme = useTheme();

  function stringAvatar(name: string) {
    return `${name.split(" ")[0][0].toUpperCase()}${
      name.split(" ").length > 1 ? name.split(" ")[1][0].toUpperCase() : ""
    }`;
  }

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
              <Typography color="black">Hello, sanjay</Typography>
              <IconButton size="small" color="primary">
                <Avatar className="bg-gray-500">{stringAvatar("test")}</Avatar>
              </IconButton>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      {children}
    </div>
  );
};

export default AppWrapper;
