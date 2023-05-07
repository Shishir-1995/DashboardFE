import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CssBaseline } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CssBaseline />
      <App />
    </LocalizationProvider>
  </>
  // </React.StrictMode>,
);
