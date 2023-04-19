import { Chip } from "@mui/material";
import PageLoader from "modules/common/components/page-loader";
import { CourseType } from "modules/common/enum/course-type.enum";
import { Slot } from "modules/students/dto/pp-slotes.dto";
import { useGetSlots } from "modules/students/service/hook";

interface Props {
  courseType: CourseType;
}

const Slots: React.FC<Props> = ({ courseType }) => {
  const { data, loading } = useGetSlots();

  const slotsData = data?.reduce((result: { [key: string]: Slot[] }, slot) => {
    const date = new Date(slot.startTime).toLocaleDateString();

    if (!result[date]) {
      result[date] = [];
    }

    result[date].push(slot);

    return result;
  }, {});

  function handleBookPP() {
    alert("Ticket Book");
  }

  return (
    <div className="flex flex-col gap-4">
      {!loading && slotsData ? (
        Object.keys(slotsData).map((slot) => (
          <div key={slot} className="flex gap-4 justify-center items-start">
            <Chip
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
                  onClick={handleBookPP}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <PageLoader />
      )}
    </div>
  );
};

export default Slots;
