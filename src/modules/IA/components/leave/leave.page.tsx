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
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { DatePicker, DateValidationError } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import TaskTable from "./components/task-table";
import { useState } from "react";
import { LeaveTask } from "modules/IA/dto/task.dto";
import { IARepo } from "modules/IA/service/repo";
import { HttpClientUtil } from "@http-client";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export interface LeaveFormData {
  reason: string;
  startDate: string | Date;
  endDate: string | Date;
  startSession: number;
  endSession: number;
  handoverTask: LeaveTask[];
}

const initDate: LeaveFormData = {
  reason: "",
  startDate: dayjs().format("DD-MM-YYYY"),
  endDate: dayjs().format("DD-MM-YYYY"),
  startSession: 1,
  endSession: 2,
  handoverTask: [],
};

const LeavePage = () => {
  const { formatMessage } = useLocale();
  const [leaveData, setLeaveData] = useState(initDate);
  const [error, setError] = useState<DateValidationError | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  async function handleForm(e: React.BaseSyntheticEvent) {
    console.log(leaveData);
    e.preventDefault();
    try {
      await IARepo.leave({
        ...leaveData,
        startDate: new Date(leaveData.startDate),
        endDate: new Date(leaveData.endDate),
      });
      navigate(-1);
      enqueueSnackbar(formatMessage("leave_requested_msg"), {
        variant: "success",
      });
    } catch (error) {
      const msg = HttpClientUtil.getErrorMsgKey(error);
      enqueueSnackbar(msg, { variant: "error" });
    }
  }

  async function handleChange(e: React.BaseSyntheticEvent | SelectChangeEvent) {
    const { name, value } = e.target;
    setLeaveData({ ...leaveData, [name]: value });
  }

  function updateTask(tasks: LeaveTask[]) {
    setLeaveData({ ...leaveData, handoverTask: [...tasks] });
  }

  return (
    <Card className="my-6">
      <Typography variant="h1" color="GrayText" className="m-6">
        {formatMessage("leave_application_title")}
      </Typography>
      <Divider />
      <form onSubmit={handleForm}>
        <Box className="m-6">
          <Typography>* indicates required</Typography>
          <div className="flex flex-col gap-6 my-4">
            <TextField
              name="reason"
              onChange={handleChange}
              label={formatMessage("reason")}
              multiline
              minRows={3}
              fullWidth
              required
            />
            <div className="flex gap-6">
              <DatePicker
                label={formatMessage("leave_start_date")}
                disablePast
                defaultValue={dayjs()}
                onChange={(newValue) =>
                  setLeaveData({
                    ...leaveData,
                    startDate: dayjs(newValue).format("DD-MM-YYYY"),
                  })
                }
                onError={(newError) => setError(newError)}
                slotProps={{
                  textField: {
                    required: true,
                    fullWidth: true,
                  },
                }}
              />
              <DatePicker
                label={formatMessage("leave_end_date")}
                disablePast
                defaultValue={dayjs()}
                minDate={dayjs(leaveData.startDate, "DD-MM-YYYY")}
                onChange={(newValue) =>
                  setLeaveData({
                    ...leaveData,
                    endDate: dayjs(newValue).format("DD-MM-YYYY"),
                  })
                }
                onError={(newError) => setError(newError)}
                slotProps={{
                  textField: {
                    required: true,
                    fullWidth: true,
                    helperText: error && "Please select a valid date",
                  },
                }}
              />
            </div>
            <div className="flex gap-6">
              <FormControl fullWidth required>
                <InputLabel>{formatMessage("session_start")}</InputLabel>
                <Select
                  label={formatMessage("session_start")}
                  name="startSession"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Slot 1</MenuItem>
                  <MenuItem value={2}>Slot 2</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth required>
                <InputLabel>{formatMessage("session_end")}</InputLabel>
                <Select
                  label={formatMessage("session_end")}
                  name="endSession"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Slot 1</MenuItem>
                  <MenuItem value={2}>Slot 2</MenuItem>
                </Select>
              </FormControl>
            </div>
            <TaskTable tasks={leaveData.handoverTask} updateTask={updateTask} />
          </div>
          <Button
            disabled={!!error}
            size="large"
            type="submit"
            variant="contained"
            className="px-10"
          >
            {formatMessage("request")}
          </Button>
        </Box>
      </form>
    </Card>
  );
};

export default LeavePage;
