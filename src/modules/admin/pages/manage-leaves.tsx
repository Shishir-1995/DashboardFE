import { Card, Tabs, Tab, Box, TablePagination, Button } from "@mui/material";

import { useState, useEffect, useMemo } from "react";
import { AdminLeaveTabs } from "../enum/leave-tab.enum";
import { enqueueSnackbar } from "notistack";
import { HttpClientUtil } from "@http-client";
import { AdminRepo } from "../service/repo";

import { useLocale } from "@locale";
import { LeaveData } from "modules/common/dto/leave.dto";
import LeaveTile from "modules/common/components/leave-tile";
import { getCookie } from "utils/cookies/cookies";
import { LeaveStatus } from "modules/common/enum/leave-status.enum";

const ManageLeaves = () => {
  const [tabValue, setTabValue] = useState<AdminLeaveTabs>(
    AdminLeaveTabs.Pending
  );
  const [leaves, setLeaves] = useState<LeaveData[]>([]);
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const { formatMessage } = useLocale();

  useEffect(() => {
    async function getLeaveData() {
      try {
        const data = await AdminRepo.getLeaves(tabValue, page + 1);
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
  }, [page, tabValue]);

  function handleTabChange(_event: React.SyntheticEvent, newValue: string) {
    setTabValue(newValue as AdminLeaveTabs);
    setPage(0);
  }

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  async function handleApproveOrReject(id: number, type: "approve" | "reject") {
    try {
      await AdminRepo.approveORRejectLeave(id, type);
    } catch (error) {
      const msg = HttpClientUtil.getErrorMsgKey(error);
      enqueueSnackbar(msg, { variant: "error" });
    }
  }

  const leavesData = useMemo(() => {
    if (tabValue === AdminLeaveTabs.Approved) {
      return leaves.map((leave) => (
        <LeaveTile key={leave.id} leave={leave}></LeaveTile>
      ));
    } else if (tabValue === AdminLeaveTabs.Pending) {
      return leaves.map((leave) => (
        <LeaveTile key={leave.id} leave={leave}>
          {getCookie("role") === "Admin" ? (
            <div className="flex gap-4">
              <Button
                variant="contained"
                onClick={() => handleApproveOrReject(leave.id, "approve")}
              >
                approve
              </Button>
              <Button
                variant="outlined"
                color="warning"
                onClick={() => handleApproveOrReject(leave.id, "reject")}
              >
                reject
              </Button>
            </div>
          ) : (
            <></>
          )}
        </LeaveTile>
      ));
    } else if (tabValue === AdminLeaveTabs.Rejected) {
      return leaves.map((leave) => (
        <LeaveTile key={leave.id} leave={leave}></LeaveTile>
      ));
    } else {
      return <></>;
    }
  }, [leaves]);

  return (
    <>
      <Card className="mt-8">
        <Tabs
          className="border-b"
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
        >
          <Tab
            value={AdminLeaveTabs.Pending}
            label={formatMessage(AdminLeaveTabs.Pending)}
          />
          <Tab
            value={AdminLeaveTabs.Approved}
            label={formatMessage(AdminLeaveTabs.Approved)}
          />
          <Tab
            value={AdminLeaveTabs.Rejected}
            label={formatMessage(AdminLeaveTabs.Rejected)}
          />
        </Tabs>
        <Box>
          {leavesData}

          <TablePagination
            component="div"
            count={leaves.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={10}
            rowsPerPageOptions={[5, 10, 15]}
          />
        </Box>
      </Card>
    </>
  );
};

export default ManageLeaves;
