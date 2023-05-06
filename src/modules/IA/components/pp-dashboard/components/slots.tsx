import { HttpClientUtil } from "@http-client";
import { useLocale } from "@locale";
import { Chip } from "@mui/material";
import { SlotsForIa } from "modules/IA/dto/ia.pp-slots.dto";
import { IARepo } from "modules/IA/service/repo";
import PageLoader from "modules/common/components/page-loader";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import SlotChip from "./slot-chip";
import SlotDeleteDialog from "./slot-delete-dialog";
import AddSlotDialogIa from "./add-slot-dialog-ia";
import dayjs, { Dayjs } from 'dayjs';
import { useRef } from 'react'

interface props {
  toggleState : boolean
}

const IASlots: React.FC<props> = ({toggleState}) => {

  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState<SlotsForIa[]>([]);
  const [slotDeleteDialogState, setSlotDeleteDialogState] = useState<boolean>(false);
  const [deleteSlotId, setSlotDeleteId] = useState<number>(0);
  const [addSlotDialogestate, setAddSlotDialogestate] = useState<boolean>(false);
  const dateRef = useRef<string>("")

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

  const handleDelete=(id:number):void=>{


    console.log(id);
    setSlotDeleteId(id);
    setSlotDeleteDialogState(true);

  }

  const handleOpenSlot=():void=>{





  }




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
                  <SlotChip
                      key={s.id}
                      isBooked={s.isBooked}
                      slotTime={s.startTime} 
                      handleDelete={()=>handleDelete(s.id)}
                  />
                  <SlotDeleteDialog 
                    open={slotDeleteDialogState}
                    onClose={()=>setSlotDeleteDialogState(false)}
                    id={deleteSlotId}
                    getSlots={fetchData}
                  />
                  { i+1 === slotsData[slot].length 
                    &&
                    <Chip
                        key={s.id}
                        color={ "warning" }
                        label={"+"}
                        onClick={()=>{
                          setAddSlotDialogestate(true)
                          dateRef.current = slot
                        }}
                    />
                  } 
                  <AddSlotDialogIa 
                   open={addSlotDialogestate}
                   onClose={()=>setAddSlotDialogestate(false)}
                   getSlots={fetchData}
                   date={dateRef.current}
                  />
                  
                   
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
