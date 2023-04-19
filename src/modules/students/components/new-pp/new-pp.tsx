import { useLocale } from "@locale";
import { Button } from "@mui/material";
import { useState } from "react";
import NewPpDialog from "./components/new-pp-dialog";

interface Props {
  refetch: () => void;
}

const NewPP: React.FC<Props> = ({ refetch }) => {
  const { formatMessage } = useLocale();
  const [bookPPDialog, setBookPPDialog] = useState(false);

  return (
    <div className="m-5">
      <Button variant="contained" size="large" onClick={() => setBookPPDialog(true)}>
        {formatMessage("book_pp")}
      </Button>
      <NewPpDialog open={bookPPDialog} onClose={() => setBookPPDialog(false)} refetch={refetch} />
    </div>
  );
};

export default NewPP;
