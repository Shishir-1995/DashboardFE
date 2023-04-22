import { ThemeProvider } from "@mui/material";
import { Env } from "Env/env";
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
        </SnackbarProvider>
      </ThemeProvider>
    </LocaleProvider>
  );
}

export default App;
