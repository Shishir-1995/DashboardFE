import { HttpClientUtil } from "@http-client";
import { useLocale } from "@locale";
import { Chip } from "@mui/material";
import { SlotsForIa } from "modules/IA/dto/ia.pp-slots.dto";
import { IARepo } from "modules/IA/service/repo";
import PageLoader from "modules/common/components/page-loader";
import { CourseType } from "modules/common/enum/course-type.enum";
import { useSnackbar } from "notistack";
import { useState, useEffect, useRef } from "react";

interface props {
  toggleState : boolean
}

const IASlots: React.FC<props> = ({toggleState}) => {
  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState<SlotsForIa[]>([]);

  const { formatMessage } = useLocale();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchData();
  }, [toggleState]);

  async function fetchData() {
    setLoading(true);
    try {
      const data = await IARepo.getSlots();
      setSlots(data.slots);
      setLoading(false);
    } catch (error) {
      const msg = HttpClientUtil.getErrorMsgKey(error);
      enqueueSnackbar(msg, { variant: "error" });
      setLoading(false);
    }
  }

  const slotsData = slots?.reduce((result: Record<string, SlotsForIa[]>, slot) => {
    const date = new Date(slot.startTime).toLocaleDateString();

    if (!result[date]) {
      result[date] = [];
    }

    result[date].push(slot);

    return result;
  }, {});


  return (
    <div className="flex flex-col gap-4" style={{ padding : "10px" }} >  
    { 
    
    loading ? (
      <PageLoader />
    ) : slotsData && (
        Object.keys(slotsData).map((slot) => (
          <div key={slot} className="flex gap-4 justify-center items-start my-6">
            <Chip
              className="rounded-md"
              color="secondary"
              label={new Date(slot).toLocaleDateString("en-us", { dateStyle: "medium" })}
            />
            <div className="flex gap-4 flex-wrap items-center">
              {slotsData[slot].map((s,i) => (
                <>
                  <Chip
                    key={s.id}
                    color={ s.isBooked ? "success" : "default" }
                    label={new Date(s.startTime).toLocaleTimeString("en-us", {
                      timeZone: "Asia/Kolkata",
                    })}
                  />
                  { i+1 === slotsData[slot].length 
                  ?
                  <Chip
                    key={s.id}
                    color={ "warning" }
                    label={"+"}
                  />
                  :
                  ""
                   }
                </>
              ))}
            </div>
          </div>
        ))
      )

    }  
        
    </div>
      );
}
export default IASlots;
