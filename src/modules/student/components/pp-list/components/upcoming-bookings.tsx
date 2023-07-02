import { HttpClientUtil } from "@http-client";
import { useLocale } from "@locale";
import { Button, Typography } from "@mui/material";
import BookingTile from "modules/common/components/booking-tile";
import { PPBookingType } from "modules/common/enum/pp-booking-type.enum";
import { StudentBooking } from "modules/student/dto/student.bookings.dto";
import { studentRepo } from "modules/student/service/repo";
import { enqueueSnackbar } from "notistack";
import { useState, useEffect, useMemo, useRef } from "react";
import Pagination from "./pagination";
import PPCancelDialog from "modules/common/components/pp-cancel-dialog";

const UpcommingBookings = () => {
  const [upcommingBooking, setUpcommingBooking] = useState<StudentBooking[]>(
    []
  );
  const [ppCancelDialog, setPPCancelDialog] = useState(false);
  const ppIdRef = useRef<number>(-1);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const { formatMessage } = useLocale();

  useEffect(() => {
    fetchData();
  }, []);

  const activeBookingData = useMemo(() => {
    return upcommingBooking.map((booking) => (
      <BookingTile key={booking.id} booking={booking}>
        <div className="flex gap-4">
          <Button
            variant="contained"
            onClick={() => joinPP(booking.meetingLink)}
          >
            {formatMessage("join")}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              ppIdRef.current = booking.id;
              setPPCancelDialog(true);
            }}
            color="error"
          >
            {formatMessage("cancel")}
          </Button>
        </div>
      </BookingTile>
    ));
  }, [upcommingBooking]);

  async function fetchData() {
    try {
      const res = await studentRepo.getAllBookings(
        PPBookingType.Upcoming,
        page
      );
      setTotalPage(res.totalPages!);
      setUpcommingBooking(res.items);
    } catch (error) {
      const msg = HttpClientUtil.getErrorMsgKey(error);
      enqueueSnackbar(msg, { variant: "error" });
    }
  }

  async function handlePageChange(newPage: number) {
    setPage((page) => page + newPage);
  }

  function joinPP(url: string) {
    window.open(url, "_blank");
  }

  return (
    <div>
      {activeBookingData.length ? (
        <>
          {activeBookingData}
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
      <PPCancelDialog
        onClose={() => setPPCancelDialog(!ppCancelDialog)}
        open={ppCancelDialog}
        ppID={ppIdRef.current}
        refetch={fetchData}
      />
    </div>
  );
};

export default UpcommingBookings;
