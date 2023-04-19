import { useLocale } from "@locale";
import { Button, Dialog, DialogContent, Typography } from "@mui/material";
import { CourseType } from "modules/common/enum/course-type.enum";
import { useState, useRef } from "react";
import Slots from "./slots";

interface Props {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
}

enum DialogState {
  chooseCourseType = "choose_course_type",
  booking_PP = "book_pp",
}

const NewPpDialog: React.FC<Props> = ({ open, onClose, refetch }) => {
  const { formatMessage } = useLocale();
  const [dialogState, setDialogState] = useState<DialogState>(DialogState.chooseCourseType);
  const courseTypeRef = useRef<CourseType | undefined>();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={dialogState == DialogState.chooseCourseType ? "xs" : "sm"}
    >
      <DialogContent className="text-center">
        {dialogState === DialogState.chooseCourseType ? (
          <>
            <Typography variant="h2" fontWeight={500}>
              {formatMessage("choose_course_type")}
            </Typography>
            <div className="flex gap-8 items-center justify-center m-6">
              <Button
                variant="contained"
                color="warning"
                fullWidth
                onClick={() => {
                  courseTypeRef.current = CourseType.DSA;
                  setDialogState(DialogState.booking_PP);
                }}
              >
                {formatMessage("dsa")}
              </Button>
              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  courseTypeRef.current = CourseType.Coding;
                  setDialogState(DialogState.booking_PP);
                }}
              >
                {formatMessage("coding")}
              </Button>
            </div>
          </>
        ) : (
          <>
            {courseTypeRef.current && (
              <div>
                <Typography variant="h2" fontWeight={600}>
                  {formatMessage(courseTypeRef.current)}
                </Typography>

                <Slots courseType={courseTypeRef.current} />
                <Button
                  variant="contained"
                  onClick={() => setDialogState(DialogState.chooseCourseType)}
                >
                  {formatMessage("back")}
                </Button>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewPpDialog;
