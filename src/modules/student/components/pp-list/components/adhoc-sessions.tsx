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
import { useRef } from "react";
import AdhocPPDialogForIa from "modules/IA/components/pp-dashboard/components/adhoc-pp-dialog-ia";

const AdhocSessions = () => {
  const [adhocSessions, setAdhocSessions] = useState<StudentAdhocBooking[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const { formatMessage } = useLocale();
  const [ppFeebackDialog, setPPFeebackDialog] = useState(false);
  const adhocRef = useRef<number>(-1);
  useEffect(() => {
    fetchData();
  }, []);

  const activeBookingData = useMemo(() => {
    return adhocSessions.map((booking) => (
      <AdhocBookingTile key={booking.id} booking={booking}>
        <div className="flex gap-4">
          {!booking.isCompleted ? (
            booking.isApproved ? (
              <Button variant="contained" color="secondary">
                {formatMessage("Approved")}
              </Button>
            ) : (
              <Button variant="contained">{formatMessage("Requested")}</Button>
            )
          ) : (
            booking.isCompleted && (
              <Button
                onClick={() => {
                  if (!booking.studentFeedback) {
                    adhocRef.current = booking.id;
                    setPPFeebackDialog(true);
                  }
                }}
                color={booking.studentFeedback ? "success" : "inherit"}
                variant="contained"
              >
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

  const addFeedback = async (adhocId: number, feedback: string) => {
    try {
      await studentRepo.addFeedbackToAdhocSession(adhocId, feedback);
      enqueueSnackbar("Feedback Updated", { variant: "info" });
      fetchData();
    } catch (error) {
      const msg = HttpClientUtil.getErrorMsgKey(error);
      enqueueSnackbar(msg, { variant: "error" });
    }
  };

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

      <AdhocPPDialogForIa
        open={ppFeebackDialog}
        onClose={() => setPPFeebackDialog(false)}
        addFeedback={addFeedback}
        adhocId={adhocRef.current}
      />
    </div>
  );
};

export default AdhocSessions;
