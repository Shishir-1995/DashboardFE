import { HttpClientUtil } from "@http-client";
import { useLocale } from "@locale";
import { GridColDef } from "@mui/x-data-grid";
import { IARepo } from "modules/IA/service/repo";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { Box, TablePagination } from "@mui/material";

const LeaveStatus = () => {
  const [leaves, setLeaves] = useState<Object[]>([]);
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const { formatMessage } = useLocale();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
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

    getLeaveData();
  }, [page]);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  return (
    <>
      <Box>
        {leaves.map((leave) => (
          <div key={1}></div>
        ))}

        <TablePagination
          component="div"
          count={totalItems}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={10}
          rowsPerPageOptions={[]}
        />
      </Box>
    </>
  );
};

export default LeaveStatus;
