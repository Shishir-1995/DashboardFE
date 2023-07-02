import {
  Card,
  Tabs,
  Tab,
  Box,
  TablePagination,
  Typography,
} from "@mui/material";

import { useState, useEffect, useMemo } from "react";
import { AdminLeaveTabs } from "../enum/leave-tab.enum";
import { enqueueSnackbar } from "notistack";
import { HttpClientUtil } from "@http-client";
import { AdminRepo } from "../service/repo";

import { useLocale } from "@locale";
import { Selector, Selectors } from "../../common/components/selectors";

interface SwitcherProps {
  active: string;
  onChange: (e: string) => void;
  data: { value: string; name: string }[];
}

export const SelectorsM: React.FC<SwitcherProps> = ({
  active,
  data,
  onChange,
}) => {
  const { formatMessage } = useLocale();

  return (
    <Selectors value={active} onChange={onChange}>
      {data.map((el) => (
        <Selector key={el.value} value={el.value}>
          <Typography variant="h5">{formatMessage(el.name)}</Typography>
        </Selector>
      ))}
    </Selectors>
  );
};

const ManageLeaves = () => {
  const [tabValue, setTabValue] = useState<AdminLeaveTabs>(
    AdminLeaveTabs.Pending
  );
  const [leaves, setLeaves] = useState<Object[]>([]);
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

  console.log(page, leaves, totalItems);

  const leavesData = useMemo(() => {
    if (tabValue === AdminLeaveTabs.Approved) {
      return leaves.map((leave, i) => (
        <div key={i}>
          <div className="flex gap-4">
            <SelectorsM
              data={Object.keys(AdminLeaveTabs).map((tab) => ({
                name: tab,
                value: tab,
              }))}
              active={AdminLeaveTabs.Pending}
              onChange={(data) => console.log(data)}
            />
          </div>
        </div>
      ));
    } else if (tabValue === AdminLeaveTabs.Pending) {
      return <></>;
    } else if (tabValue === AdminLeaveTabs.Rejected) {
      return <></>;
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
            count={100}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={10}
            rowsPerPageOptions={[]}
          />
        </Box>
      </Card>
    </>
  );
};

export default ManageLeaves;
