import { HttpClientUtil } from "@http-client";
import { useLocale } from "@locale";
import { Button, Typography } from "@mui/material";
import { studentRepo } from "modules/student/service/repo";
import { enqueueSnackbar } from "notistack";
import { useState, useEffect, useMemo, useRef } from "react";
import Pagination from "./pagination";
import AdhocBookingTile from "modules/common/components/adhoc-booking-tile";
import { IaAdhocBooking } from "modules/IA/dto/ia.adhoc-list";
import { IARepo } from "modules/IA/service/repo";
import AdhocPPDialogForIa from "./adhoc-pp-dialog-ia";
import AdhocPPDialog from "modules/student/components/new-pp/components/adhoc-pp-dialog";

const IaAdhocSessions = () => {
  const [adhocSessions, setAdhocSessions] = useState<IaAdhocBooking[]>([]);
  const [page, setPage] = useState(1);
  const [ppFeebackDialog, setPPFeebackDialog] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const { formatMessage } = useLocale();
  const adhocRef = useRef<number>(-1)

  useEffect(() => {
    fetchData();
  }, []);

  const approveAdhoc = async(adhocId : number) => {
    try{
        const resData = await IARepo.updateAdhocSession(adhocId, true, false)
        enqueueSnackbar("Session Approved", { variant: "success" });
        fetchData()
    }
    catch(error){
        const msg = HttpClientUtil.getErrorMsgKey(error);
        enqueueSnackbar(msg, { variant: "error" });
    }
  }

  const isAdhocCompleted = async(adhocId : number) => {
    try{
        const resData = await IARepo.updateAdhocSession(adhocId, true, true)
        enqueueSnackbar("Session Completed.", { variant: "success" });
        fetchData()
    }
    catch(error){
        const msg = HttpClientUtil.getErrorMsgKey(error);
        enqueueSnackbar(msg, { variant: "error" });
    }
  }

  const addFeedback = async( adhocId : number, feedback : string ) => {
    try{
        await IARepo.addFeedbackToAdhocSession(adhocId, feedback)
        enqueueSnackbar("Feedback Updated", { variant : "info" })
        fetchData()
    }
    catch(error){
        const msg = HttpClientUtil.getErrorMsgKey(error);
        enqueueSnackbar(msg, { variant: "error" });
    }
  }

  const activeBookingData = useMemo(() => {
    return adhocSessions.map((booking) => (
      <AdhocBookingTile key={booking.id} booking={booking}>
        <div className="flex gap-4">
          {
            !booking.isCompleted
            ?
            <>
                {
                    !booking.isApproved 
                    ?
                    <Button variant="contained" color="warning" onClick={()=>approveAdhoc(booking.id)}>
                        {formatMessage("Approve")}
                    </Button>
                    :
                    <Button variant="contained" color="success" onClick={()=>isAdhocCompleted(booking.id)}>
                        {formatMessage("Mark as Completed")}
                    </Button>
                }
            </>
            :
            <>
            <Button
                onClick={()=>{
                    if(!booking.iaFeedback)
                    {
                        adhocRef.current = booking.id
                        setPPFeebackDialog(true)
                    }
                }}
                variant="contained"
                color={booking.iaFeedback ? "success" : "inherit"}
                >
                {formatMessage("feedback")}
            </Button>
            </>
          }
        </div>
      </AdhocBookingTile>
    ));
  }, [adhocSessions]);

  async function fetchData() {
    try {
      const res = await IARepo.getAdhocSessions(page);

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

        <AdhocPPDialogForIa
            open={ppFeebackDialog}
            onClose={() => setPPFeebackDialog(false)}
            addFeedback={addFeedback}
            adhocId={adhocRef.current}
            />
    </div>
  );
};

export default IaAdhocSessions;
