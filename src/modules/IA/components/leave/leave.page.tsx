import { useLocale } from "@locale";
import {
  Card,
  Typography,
  Divider,
  Box,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  CardContent,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import TaskTable from "./components/task-table";

const LeavePage = () => {
  const { formatMessage } = useLocale();

  return (
    <Card className="my-6">
      <Typography variant="h1" color="GrayText" className="m-6">
        {formatMessage("leave_application_title")}
      </Typography>
      <Divider />
      <Box className="m-6">
        <Typography>* indicates required</Typography>
        <div className="flex flex-col gap-6 my-4">
          <TextField label={formatMessage("reason")} multiline minRows={3} fullWidth required />
          <div className="flex gap-6">
            <DatePicker
              label={formatMessage("leave_start_date")}
              value={dayjs()}
              //   onChange={(newValue) => setValue(newValue)}
              slotProps={{
                textField: {
                  required: true,
                  fullWidth: true,
                },
              }}
            />
            <DatePicker
              label={formatMessage("leave_end_date")}
              value={dayjs()}
              //   onChange={(newValue) => setValue(newValue)}
              slotProps={{
                textField: {
                  required: true,
                  fullWidth: true,
                },
              }}
            />
          </div>
          <div className="flex gap-6">
            <FormControl fullWidth required>
              <InputLabel>{formatMessage("session_start")}</InputLabel>
              <Select
                //   value={age}
                label={formatMessage("session_start")}
                //   onChange={handleChange}
              >
                <MenuItem value="slot_1">Slot 1</MenuItem>
                <MenuItem value="slot_2">Slot 2</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth required>
              <InputLabel>{formatMessage("session_end")}</InputLabel>
              <Select
                //   value={age}
                label={formatMessage("session_end")}
                //   onChange={handleChange}
              >
                <MenuItem value="slot_1">Slot 1</MenuItem>
                <MenuItem value="slot_2">Slot 2</MenuItem>
              </Select>
            </FormControl>
          </div>
          <TaskTable />
        </div>
      </Box>
    </Card>
  );
};

export default LeavePage;
