import { useLocale } from "@locale";
import { Button, Dialog, DialogContent, Typography } from "@mui/material";
import { CourseType } from "modules/common/enum/course-type.enum";
import React, { useState, useRef } from "react";
import Slots from "./slots";

interface Props {
  open: boolean;
  onClose: () => void;
  refetch?: () => void;
}

enum DialogState {
  ChooseCourseType = "choose_course_type",
  BookingPP = "book_pp",
  Feedback = "feedback",
}

const NewPpDialog: React.FC<Props> = ({ open, onClose }) => {
  const { formatMessage } = useLocale();
  const [dialogState, setDialogState] = useState<DialogState>(DialogState.ChooseCourseType);
  const courseTypeRef = useRef<CourseType | undefined>();

  function closeDialog(e: React.SyntheticEvent, reason: string) {
    if (
      dialogState !== DialogState.ChooseCourseType &&
      (reason == "backdropClick" || reason === "escapeKeyDown")
    )
      return;

    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      fullWidth
      maxWidth={dialogState == DialogState.ChooseCourseType ? "xs" : "sm"}
    >
      <DialogContent className="text-center">
        {dialogState === DialogState.ChooseCourseType ? (
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
                  setDialogState(DialogState.BookingPP);
                }}
              >
                {formatMessage("dsa")}
              </Button>
              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  courseTypeRef.current = CourseType.Coding;
                  setDialogState(DialogState.BookingPP);
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

                <Slots courseType={courseTypeRef.current} closeDialog={onClose} />
                <Button
                  variant="outlined"
                  onClick={() => {
                    setDialogState(DialogState.ChooseCourseType);
                  }}
                  className="float-right"
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
