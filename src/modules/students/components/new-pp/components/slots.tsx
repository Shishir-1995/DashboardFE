import { HttpClientUtil } from "@http-client";
import { useLocale } from "@locale";
import { Button, Chip, Typography } from "@mui/material";
import PageLoader from "modules/common/components/page-loader";
import { CourseType } from "modules/common/enum/course-type.enum";
import { Slot } from "modules/students/dto/pp-slotes.dto";
import { studentRepo } from "modules/students/service/repo";
import { useSnackbar } from "notistack";
import { useState, useEffect, useRef } from "react";
import BookingDialog from "./booking-dialog";

interface Props {
  courseType: CourseType;
  closeDialog: () => void;
}

const Slots: React.FC<Props> = ({ courseType, closeDialog }) => {
  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [bookingDialog, setBookingDialog] = useState(false);
  const slotIdRef = useRef<{ slotId: number; courseType: CourseType }>();

  const { formatMessage } = useLocale();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const data = await studentRepo.getSlots(courseType);
      setSlots(data);
      setLoading(false);
    } catch (error) {
      const msg = HttpClientUtil.getErrorMsgKey(error);
      enqueueSnackbar(msg, { variant: "error" });
      setLoading(false);
    }
  }

  const slotsData = slots?.reduce((result: Record<string, Slot[]>, slot) => {
    const date = new Date(slot.startTime).toLocaleDateString();

    if (!result[date]) {
      result[date] = [];
    }

    result[date].push(slot);

    return result;
  }, {});

  function handleBookPP(slotId: number) {
    slotIdRef.current = { slotId: slotId, courseType: courseType };
    setBookingDialog(true);
  }

  return (
    <div className="flex flex-col gap-4">
      {loading ? (
        <PageLoader />
      ) : slotsData ? (
        Object.keys(slotsData).map((slot) => (
          <div key={slot} className="flex gap-4 justify-center items-start my-6">
            <Chip
              className="rounded-md"
              color="secondary"
              label={new Date(slot).toLocaleDateString("en-us", { dateStyle: "medium" })}
            />
            <div className="flex gap-4 flex-wrap items-center">
              {slotsData[slot].map((s) => (
                <Chip
                  key={s.id}
                  label={new Date(s.startTime).toLocaleTimeString("en-us", {
                    timeZone: "Asia/Kolkata",
                  })}
                  onClick={() => handleBookPP(s.id)}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div>
          <Typography>{formatMessage("no_pp_slots_available")}</Typography>
          <Button variant="contained" color="success">
            {formatMessage("feedback")}
          </Button>
        </div>
      )}

      {slotIdRef.current && (
        <BookingDialog
          open={bookingDialog}
          onClose={() => setBookingDialog(false)}
          refetch={fetchData}
          slotDetails={{ ...slotIdRef.current }}
        />
      )}
    </div>
  );
};

export default Slots;
