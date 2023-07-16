import { HttpClientUtil } from "@http-client";
import { useLocale } from "@locale";
import { IARepo } from "modules/IA/service/repo";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { Box, TablePagination, Typography } from "@mui/material";
import LeaveTile from "./components/leave-tile";
import { LeaveData } from "modules/common/dto/leave.dto";

const LeaveStatus = () => {
  const [leaves, setLeaves] = useState<LeaveData[]>([]);
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const { formatMessage } = useLocale();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getLeaveData();
  }, [page]);

  async function getLeaveData() {
    try {
      const data = await IARepo.getLeaves(page + 1);
      setLeaves([...data.items]);
      setPage(data.page);
      setTotalItems(data.total ?? 0);
    } catch (error) {
      enqueueSnackbar(HttpClientUtil.getErrorMsgKey(error), {
        variant: "error",
      });
    }
  }

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  return (
    <>
      <Box className="mt-6">
        {leaves.length ? (
          leaves.map((leave) => <LeaveTile key={1} leave={leave} refetch={getLeaveData} />)
        ) : (
          <Typography variant="h3" color={"primary"} className="flex justify-center items-center">
            {formatMessage("no_leave_available")}
          </Typography>
        )}

        <TablePagination
          component="div"
          count={leaves.length}
          page={page - 1}
          onPageChange={handleChangePage}
          rowsPerPage={10}
          rowsPerPageOptions={[]}
        />
      </Box>
    </>
  );
};

export default LeaveStatus;
