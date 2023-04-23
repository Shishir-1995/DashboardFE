import { HttpClientUtil } from "@http-client";
import { useLocale } from "@locale";
import { Button, Typography } from "@mui/material";
import BookingTile from "modules/common/components/booking-tile";
import { PPBookingType } from "modules/common/enum/pp-booking-type.enum";
import { StudentBooking } from "modules/student/dto/student.bookings.dto";
import { studentRepo } from "modules/student/service/repo";
import { useSnackbar } from "notistack";
import { useState, useEffect, useMemo, useRef } from "react";
import Pagination from "./pagination";
import PPFeebackDialog from "./pp-feeback-dialog";

const HistoryBookings = () => {
  const [historyBooking, sethistroyBooking] = useState<StudentBooking[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const { formatMessage } = useLocale();
  const { enqueueSnackbar } = useSnackbar();
  const [ppFeebackDialog, setPPFeebackDialog] = useState(false);
  const ppIdRef = useRef<number>(-1);

  useEffect(() => {
    fetchData();
  }, []);

  const historyBookingData = useMemo(() => {
    return historyBooking.map((booking) => (
      <BookingTile key={booking.id} booking={booking}>
        <div className="flex gap-4">
          <Button
            onClick={() => {
              if (!booking.studentFeedback) {
                setPPFeebackDialog(true);
                ppIdRef.current = booking.id;
              }
            }}
            variant="contained"
            color={booking.studentFeedback ? "success" : "error"}
          >
            {formatMessage("feedback")}
          </Button>
        </div>
      </BookingTile>
    ));
  }, [historyBooking]);

  async function fetchData() {
    try {
      const res = await studentRepo.getAllBookings(PPBookingType.History, page);
      setTotalPage(res.totalPages);
      sethistroyBooking(res.items);
    } catch (error) {
      const msg = HttpClientUtil.getErrorMsgKey(error);
      enqueueSnackbar(msg, { variant: "error" });
    }
  }

  async function handlePageChange(newPage: number) {
    setPage((page) => page + newPage);
  }
  return (
    <div>
      {historyBookingData.length ? (
        <>
          {historyBookingData}
          <Pagination
            currentPage={page}
            totalPage={totalPage}
            handlePageChange={handlePageChange}
          />
        </>
      ) : (
        <Typography variant="h3" color="primary" className="my-6 text-center">
          {formatMessage("no_pp_history")}
        </Typography>
      )}

      <PPFeebackDialog
        open={ppFeebackDialog}
        onClose={() => setPPFeebackDialog(false)}
        ppID={ppIdRef.current}
        refetch={fetchData}
      />
    </div>
  );
};

export default HistoryBookings;
