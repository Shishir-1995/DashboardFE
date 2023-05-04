import { HttpClientUtil } from "@http-client";
import { useLocale } from "@locale";
import { Button, Typography } from "@mui/material";
import BookingTile from "modules/common/components/booking-tile";
import { PPBookingType } from "modules/common/enum/pp-booking-type.enum";
import {
  StudentAdhocBooking,
  StudentBooking,
} from "modules/student/dto/student.bookings.dto";
import { studentRepo } from "modules/student/service/repo";
import { enqueueSnackbar } from "notistack";
import { useState, useEffect, useMemo } from "react";
import Pagination from "./pagination";
import AdhocBookingTile from "modules/common/components/adhoc-booking-tile";

const AdhocSessions = () => {
  const [adhocSessions, setAdhocSessions] = useState<StudentAdhocBooking[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const { formatMessage } = useLocale();

  useEffect(() => {
    fetchData();
  }, []);

  const activeBookingData = useMemo(() => {
    return adhocSessions.map((booking) => (
      <AdhocBookingTile key={booking.id} booking={booking}>
        <div className="flex gap-4">
          {!booking.isCompleted ? (
            booking.isApproved ? (
              <Button variant="contained" color="success">
                {formatMessage("Approved")}
              </Button>
            ) : (
              <Button variant="contained">{formatMessage("Requested")}</Button>
            )
          ) : (
            booking.isCompleted && (
              <Button variant="contained" color="primary">
                {formatMessage("Feedback")}
              </Button>
            )
          )}
        </div>
      </AdhocBookingTile>
    ));
  }, [adhocSessions]);

  async function fetchData() {
    try {
      const res = await studentRepo.getAdhocSessions(page);

      setAdhocSessions(res.items);
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

  async function cancelPP(ppId: number) {
    try {
      await studentRepo.cancelPP(ppId);
      enqueueSnackbar(formatMessage("pp_cancel_sucessfull_msg"), {
        variant: "success",
      });
      fetchData();
    } catch (error) {
      const msg = HttpClientUtil.getErrorMsgKey(error);
      enqueueSnackbar(msg, { variant: "error" });
    }
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
    </div>
  );
};

export default AdhocSessions;
