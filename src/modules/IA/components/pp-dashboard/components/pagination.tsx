import { Button, IconButton, Typography } from "@mui/material";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

interface Props {
  currentPage: number;
  totalPage: number;
  handlePageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ currentPage, totalPage, handlePageChange }) => {
  return (
    <div className="m-3 flex gap-4 justify-end items-center">
      <IconButton disabled={currentPage === 1}>
        <ChevronLeftIcon />
      </IconButton>

      <Typography variant="h2" color="GrayText">
        {currentPage}
      </Typography>

      <IconButton disabled={currentPage === totalPage}>
        <ChevronRightIcon />
      </IconButton>
    </div>
  );
};

export default Pagination;
