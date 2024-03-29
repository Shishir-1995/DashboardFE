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
import { useRef } from "react";
import AddIcon from "@mui/icons-material/Add";

interface props {
  toggleState: boolean;
}

const IASlots: React.FC<props> = ({ toggleState }) => {
  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState<SlotsForIa[]>([]);
  const [slotDeleteDialogState, setSlotDeleteDialogState] =
    useState<boolean>(false);
  const [deleteSlotId, setSlotDeleteId] = useState<number>(0);
  const [addSlotDialogestate, setAddSlotDialogestate] =
    useState<boolean>(false);
  const dateRef = useRef<string>("");

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchData();
  }, [toggleState]);

  async function fetchData() {
    try {
      setLoading(true);
      const data = await IARepo.getSlots();
      setSlots(data.data);
    } catch (error) {
      const msg = HttpClientUtil.getErrorMsgKey(error);
      enqueueSnackbar(msg, { variant: "error" });
    } finally {
      setLoading(false);
    }
  }

  const slotsData = slots?.reduce(
    (result: Record<string, SlotsForIa[]>, slot) => {
      const date = new Date(slot.startTime).toLocaleDateString();

      if (!result[date]) {
        result[date] = [];
      }

      result[date].push(slot);

      return result;
    },
    {}
  );

  const handleDelete = (id: number): void => {
    setSlotDeleteId(id);
    setSlotDeleteDialogState(true);
  };

  const handleOpenSlot = (): void => {};

  return (
    <>
      <div className="flex flex-col gap-4 px-4">
        {loading ? (
          <PageLoader />
        ) : (
          slotsData &&
          Object.keys(slotsData).map((slot) => (
            <div key={slot} className="flex gap-4 items-start my-6">
              <Chip
                className="rounded-md"
                color="secondary"
                label={new Date(slot).toLocaleDateString("en-us", {
                  dateStyle: "medium",
                })}
              />
              <div className="flex gap-4 flex-wrap items-center">
                {slotsData[slot].map((s, i) => (
                  <SlotChip
                    key={s.id}
                    isBooked={s.isBooked}
                    slotTime={s.startTime}
                    handleDelete={() => handleDelete(s.id)}
                  />
                ))}
                {new Date(slot).getTime() >= new Date().getTime() && (
                  <Chip
                    color={"warning"}
                    label={<AddIcon />}
                    onClick={() => {
                      setAddSlotDialogestate(true);
                      dateRef.current = slot;
                    }}
                  />
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <SlotDeleteDialog
        open={slotDeleteDialogState}
        onClose={() => setSlotDeleteDialogState(false)}
        id={deleteSlotId}
        getSlots={fetchData}
      />

      <AddSlotDialogIa
        open={addSlotDialogestate}
        onClose={() => setAddSlotDialogestate(false)}
        getSlots={fetchData}
        date={dateRef.current}
      />
    </>
  );
};
export default IASlots;
