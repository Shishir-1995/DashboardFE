import styled from "@emotion/styled";
import { useLocale } from "@locale";
import { Typography } from "@mui/material";
import { StudentBooking } from "modules/students/dto/student.bookings.dto";

const StyleBookingTile = styled("div")(({ theme }) => ({
  padding: "8px 16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #eaeaeaca",
  boxShadow: theme.shadow.shadow_10,
  backgroundColor: theme.palette.common.white,

  "&:hover": {
    backgroundColor: theme.palette.background.default,
  },
}));

interface Props {
  booking: StudentBooking;
  children: React.ReactNode;
}

const BookingTile: React.FC<Props> = ({ booking, children }) => {
  const { formatMessage } = useLocale();

  return (
    <StyleBookingTile>
      <div className="flex flex-col gap-2">
        <Typography variant="h3" color="primary">
          {formatMessage("topic")} : {booking.topic}
        </Typography>
        <Typography variant="h4">
          {formatMessage("pair_programmer")} : {booking.iaId}
        </Typography>
        <Typography variant="h4" fontWeight={500} className="italic">
          {new Date(booking.SlotDate).toLocaleDateString("en-US", { dateStyle: "medium" })} :{" "}
          {new Date(booking.SlotDate).toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" })}
        </Typography>
      </div>
      <div>{children}</div>
    </StyleBookingTile>
  );
};

export default BookingTile;
