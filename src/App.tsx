import { Button, ThemeProvider } from "@mui/material";
import LocaleProvider from "modules/locale/components/locale-provider";
import { SnackbarProvider } from "notistack";
import AllRoutes from "routes";
import { theme } from "styles/theme";

function App() {
  return (
    <LocaleProvider>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={1}>
          <AllRoutes />
          <Button variant="contained" className="m-5 ">
            Helloo world
          </Button>
        </SnackbarProvider>
      </ThemeProvider>
    </LocaleProvider>
  );
}

export default App;
