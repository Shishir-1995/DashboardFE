import { useLocale } from "@locale";
import { Box, Button, Tab, Tabs } from "@mui/material";
import TabPanel from "modules/common/components/tab-panel";
import { PPTab } from "modules/common/enum/pp-tab.enum";
import { useState, useMemo, useRef } from "react";
import { useGetAllStudentBookings } from "../../service/hook";
import BookingTile from "modules/common/components/booking-tile";
import { studentRepo } from "modules/students/service/repo";
import { useSnackbar } from "notistack";
import { HttpClientUtil } from "@http-client";
import PPFeebackDialog from "./components/pp-feeback-dialog";
import { StudentBooking } from "modules/students/dto/student.bookings.dto";

interface Props {
  loading: boolean;
  data: StudentBooking[];
  refetch: () => void;
}

const PPList: React.FC<Props> = ({ loading, data, refetch }) => {
  const [tabValue, setTabValue] = useState<PPTab>(PPTab.UpcommingEvents);
  const { formatMessage } = useLocale();
  const { enqueueSnackbar } = useSnackbar();
  const [ppFeebackDialog, setPPFeebackDialog] = useState(false);
  const ppIdRef = useRef<number>(-1);

  const activeBooking = useMemo(() => {
    return data
      ?.filter((booking) => new Date(booking.SlotDate) >= new Date())
      .map((booking) => (
        <BookingTile key={booking.id} booking={booking}>
          <div className="flex gap-4">
            <Button variant="contained" onClick={() => joinPP(booking.studentFeedback)}>
              {formatMessage("join")}
            </Button>
            <Button variant="contained" onClick={() => cancelPP(booking.id)} color="error">
              {formatMessage("cancel")}
            </Button>
          </div>
        </BookingTile>
      ));
  }, [data]);

  const historyBooking = useMemo(() => {
    return data
      ?.filter((booking) => new Date(booking.SlotDate) < new Date())
      .map((booking) => (
        <BookingTile key={booking.id} booking={booking}>
          <div className="flex gap-4">
            <Button
              onClick={() => {
                if (!booking.iaFeedback) {
                  setPPFeebackDialog(true);
                  ppIdRef.current = booking.id;
                }
              }}
              variant="contained"
              color={booking.iaFeedback ? "success" : "error"}
            >
              {formatMessage("feedback")}
            </Button>
          </div>
        </BookingTile>
      ));
  }, [data]);

  function handleTabChange(event: React.SyntheticEvent, newValue: string) {
    setTabValue(newValue as PPTab);
  }

  function joinPP(url: string) {
    window.open(url, "_blank");
  }

  async function cancelPP(ppId: number) {
    try {
      await studentRepo.cancelPP(ppId);
      enqueueSnackbar("pp_cancel_sucessfull_msg", { variant: "success" });
      refetch();
    } catch (error) {
      const msg = HttpClientUtil.getErrorMsgKey(error);
      enqueueSnackbar(msg, { variant: "error" });
    }
  }

  return (
    <div>
      <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
        <Tab value={PPTab.UpcommingEvents} label={formatMessage(PPTab.UpcommingEvents)} />
        <Tab value={PPTab.History} label={formatMessage(PPTab.History)} />
      </Tabs>
      <Box>
        <TabPanel value={tabValue} index={PPTab.UpcommingEvents}>
          {activeBooking}
        </TabPanel>
        <TabPanel value={tabValue} index={PPTab.History}>
          {historyBooking}
        </TabPanel>
      </Box>
      <PPFeebackDialog
        open={ppFeebackDialog}
        onClose={() => setPPFeebackDialog(false)}
        ppID={ppIdRef.current}
        refetch={refetch}
      />
    </div>
  );
};

export default PPList;
