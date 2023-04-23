import { useLocale } from "@locale";
import { Button } from "@mui/material";
import { useState } from "react";
import NewPpDialog from "./components/new-pp-dialog";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  refetch?: () => void;
}

const NewPP: React.FC<Props> = ({ refetch }) => {
  const { formatMessage } = useLocale();
  const [bookPPDialog, setBookPPDialog] = useState(false);

  return (
    <div className=" my-8">
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        size="large"
        onClick={() => setBookPPDialog(true)}
      >
        {formatMessage("book_pp")}
      </Button>
      <NewPpDialog open={bookPPDialog} onClose={() => setBookPPDialog(false)} />
    </div>
  );
};

export default NewPP;
